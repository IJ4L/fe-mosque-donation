import { useState, useRef, useEffect } from "react";
import { useNews, useNewsById } from "../api/get-news";
import { useUpdateNews } from "../api/update-news";
import { useDeleteNews } from "../api/delete-news";
import { toast } from "sonner";

export function useNewsAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
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
  const { mutate: deleteNews } = useDeleteNews();  useEffect(() => {
    if (editingNews && editingNews.data) {
      console.log("Editing news data:", editingNews.data);
      
      setTitle(editingNews.data.newsName || "");
      setDescription(editingNews.data.newsDescription || "");
      
      if (editingNews.data.newsImage) {
        const imgPath = editingNews.data.newsImage;
        console.log("News image path:", imgPath);
        
        const formattedPath = imgPath.startsWith('http') 
          ? imgPath 
          : `http://localhost:9999${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
        
        console.log("Formatted image path:", formattedPath);
        setImagePreview(formattedPath);
      } else {
        console.log("No image path in edited news");
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
      toast.error("ID berita tidak valid");
      return;
    }

    setIsDeleting(true);
    toast.loading("Menghapus berita...");

    deleteNews(deletingNewsId, {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Berita berhasil dihapus!");
        setOpenDeleteDialog(false);
        setDeletingNewsId(null);
        setIsDeleting(false);
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(`Gagal menghapus berita: ${error.response?.data?.message || error.message || "Terjadi kesalahan"}`);
        console.error("Delete error:", error);
        setIsDeleting(false);
      },
    });
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Judul berita tidak boleh kosong");
      return;
    }

    if (!description.trim()) {
      toast.error("Deskripsi berita tidak boleh kosong");
      return;
    }

    if (!editingNewsId) {
      toast.error("ID berita tidak valid");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Menyimpan perubahan...");
    
    const formData = new FormData();

    if (fileInputRef.current && fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];

      console.log(`Update - File selected: ${file.name} (${file.size} bytes, ${file.type})`);

      if (file.size === 0) {
        toast.dismiss();
        toast.error("File gambar kosong atau rusak");
        setIsSubmitting(false);
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.dismiss();
        toast.error("File bukan gambar valid");
        setIsSubmitting(false);
        return;
      }

      const cleanFileName = file.name.replace(/[^\w\s\-\.]/g, '_');
      const cleanedFile = new File([file], cleanFileName, { type: file.type });
      
      formData.append("newsImage", cleanedFile);
    } else {
      console.log("No new image file selected, keeping existing image");
    }

    formData.append("newsAuthor", 1);
    formData.append("newsName", title);
    formData.append("newsDescription", description);

    const newsId = String(editingNewsId).trim();

    updateNews(
      { id: newsId, formData },
      {        onSuccess: () => {
          toast.dismiss();
          toast.success("Berita berhasil diperbarui!");
          setOpen(false);
          setImagePreview(null);
          setTitle("");
          setDescription("");
          setEditingNewsId(null);
          setIsSubmitting(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(`Gagal memperbarui berita: ${error.response?.data?.message || error.message || "Terjadi kesalahan"}`);
          console.error("Update error:", error);
          setIsSubmitting(false);
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
