import { useState, useEffect, useRef } from "react";
import { usePostNews } from "@/features/dashboard/api/post-news";
import { toast } from "sonner";

export function useNewsForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };  
  const handleImageChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      console.log("handleImageChange: File selected:", file.name);
      try {
        const objectUrl = URL.createObjectURL(file);
        console.log("Preview URL created:", objectUrl);
        setImagePreview(objectUrl);
      } catch (error) {
        console.error("Error creating object URL:", error);
        toast.error("Error creating image preview");
      }
    } else {
      console.log("handleImageChange: No file selected");
    }
  };

  useEffect(() => {
    const hasImage = !!imagePreview;
    const hasTitle = !!title.trim();
    const hasDescription = !!description.trim();

    setFormValid(hasImage && hasTitle && hasDescription);
  }, [title, description, imagePreview]);

  const { mutate, isLoading, isError, isSuccess } = usePostNews();  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fileInputRef.current || !fileInputRef.current.files[0]) {
      toast.error("Silakan pilih gambar terlebih dahulu");
      return;
    }

    if (!title.trim()) {
      toast.error("Silakan masukkan judul berita");
      return;
    }

    if (!description.trim()) {
      toast.error("Silakan masukkan deskripsi berita");
      return;
    }    
      toast.loading("Menambahkan berita...");    
    
    const formData = new FormData();
    
    try {
      if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
        throw new Error("File tidak ditemukan");
      }
      
      const file = fileInputRef.current.files[0];
      
      if (!file || file.size === 0) {
        throw new Error("File rusak atau kosong");
      }
      
      if (!file.type.startsWith('image/')) {
        throw new Error("File bukan gambar. Silakan pilih gambar yang valid");
      }
      
      console.log(`File selected: ${file.name} (${file.size} bytes, ${file.type})`);
      
      const cleanFileName = file.name.replace(/[^\w\s\-\.]/g, '_');
      const cleanedFile = new File([file], cleanFileName, { type: file.type });
      
      formData.append("newsImage", cleanedFile);
      
      formData.append("newsName", title.trim());
      formData.append("newsDescription", description.trim());
      formData.append("newsAuthor", "1");
      
      
    } catch (error) {
      console.error('Error preparing form data:', error);
      toast.dismiss();
      toast.error("Gagal menyiapkan data: " + error.message);
      return;
    }
    
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0], pair[1].name, pair[1].size);
      } else {
        console.log(pair[0], pair[1]);
      }
    }
    
    mutate(formData, {
      onSuccess: (data) => {
        console.log("News added successfully, response:", data);
        toast.dismiss();
        toast.success("Berita berhasil ditambahkan!");
        setOpen(false);
        setImagePreview(null);
        setTitle("");
        setDescription("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: (error) => {
        console.error("Failed to add news:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
        toast.dismiss();
        toast.error(
          "Gagal menambahkan berita: " + (error.response?.data?.message || error.message || "Silakan coba lagi")
        );
      },
    });
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    open,
    setOpen,
    fileInputRef,
    imagePreview,
    formValid,
    isLoading,
    isError,
    isSuccess,
    handleDivClick,
    handleImageChange,
    handleSubmit,
  };
}
