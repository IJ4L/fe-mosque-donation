import { useState, useRef, useEffect } from "react";
import { useNews, useNewsById } from "../api/get-news";
import { useUpdateNews } from "../api/update-news";
import { useDeleteNews } from "../api/delete-news";

export function useNewsAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit per page
  const { data, isLoading, error } = useNews(currentPage, limit);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [deletingNewsId, setDeletingNewsId] = useState(null);
  const [viewingNewsId, setViewingNewsId] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailSheet, setOpenDetailSheet] = useState(false);  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const fileInputRef = useRef(null);

  const { data: editingNews } = useNewsById(editingNewsId);
  const { data: viewingNews } = useNewsById(viewingNewsId);
  const { mutate: updateNews } = useUpdateNews();
  const { mutate: deleteNews } = useDeleteNews();
  useEffect(() => {
    if (editingNews && editingNews.data) {
      setTitle(editingNews.data.newsName || "");
      setDescription(editingNews.data.newsDescription || "");
      if (editingNews.data.newsImage) {
        setImagePreview("http://localhost:9999" + editingNews.data.newsImage);
      }
    }
  }, [editingNews]);

  useEffect(() => {
    const hasImage = !!imagePreview;
    const hasTitle = !!title.trim();
    const hasDescription = !!description.trim();
    
    setFormValid(hasImage && hasTitle && hasDescription);
  }, [title, description, imagePreview]);
  const handleEditClick = (id) => {
    setEditingNewsId(String(id));
    setOpen(true);
  };

  const handleViewClick = (id) => {
    setViewingNewsId(String(id));
    setOpenDetailSheet(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingNewsId(String(id));
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingNewsId) {
      alert("ID berita tidak valid");
      return;
    }

    setIsDeleting(true);

    deleteNews(deletingNewsId, {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setDeletingNewsId(null);
        setIsDeleting(false);
        // alert("Berita berhasil dihapus!");
      },
      onError: (error) => {
        console.error("Delete error:", error);
        setIsDeleting(false);
        // alert(
        //   `Gagal menghapus berita: ${error.response?.data?.message || error.message || "Terjadi kesalahan"}`
        // );
      },
    });
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul berita tidak boleh kosong");
      return;
    }

    if (!description.trim()) {
      alert("Deskripsi berita tidak boleh kosong");
      return;
    }

    if (!editingNewsId) {
      alert("ID berita tidak valid");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    if (fileInputRef.current.files[0]) {
      formData.append("newsImage", fileInputRef.current.files[0]);
    } else if (editingNews && editingNews.data && editingNews.data.newsImage) {
      formData.append("newsImage", editingNews.data.newsImage);
    }

    formData.append("newsName", title);
    formData.append("newsDescription", description);

    const newsId = String(editingNewsId).trim();

    updateNews(
      { id: newsId, formData },
      {
        onSuccess: () => {
          setOpen(false);
          setImagePreview(null);
          setTitle("");
          setDescription("");
          setEditingNewsId(null);
          setIsSubmitting(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          alert("Berita berhasil diperbarui!");
        },
        onError: (error) => {
          console.error("Update error:", error);
          setIsSubmitting(false);
          alert(
            `Gagal memperbarui berita: ${error.response?.data?.message || error.message || "Terjadi kesalahan"}`
          );
        },
      }
    );
  };  return {
    data,
    isLoading,
    error,
    editingNewsId,
    deletingNewsId,
    viewingNewsId,
    open,
    openDeleteDialog,
    openDetailSheet,
    title,
    description,
    imagePreview,    isSubmitting,
    isDeleting,
    formValid,
    fileInputRef,
    editingNews,
    viewingNews,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    setOpen,
    setOpenDeleteDialog,
    setOpenDetailSheet,
    setTitle,
    setDescription,
    handleEditClick,
    handleDeleteClick,
    handleViewClick,
    handleConfirmDelete,
    handleDivClick,
    handleImageChange,
    handleSubmit,
    handleNextPage: () => {
      if (data?.pagination && currentPage < data.pagination.totalPages) {
        setCurrentPage(prev => prev + 1);
      }
    },
    handlePrevPage: () => {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    },
    handlePageChange: (pageNumber) => {
      setCurrentPage(pageNumber);
    }
  };
}
