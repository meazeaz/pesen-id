import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Di sinilah kita mengatur jenis file apa saja yang boleh masuk
export const ourFileRouter = {
  
  // 1. Pintu khusus Gambar (Avatar & Foto Produk) - Maksimal 4MB
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Gambar berhasil di-upload:", file.url);
      return { url: file.url };
    }),

  // 2. Pintu khusus File Digital (PDF/ZIP untuk dijual) - Maksimal 32MB
  productFileUploader: f({ 
    "pdf": { maxFileSize: "16MB", maxFileCount: 1 }, 
    "application/zip": { maxFileSize: "32MB", maxFileCount: 1 } 
  })
    .onUploadComplete(async ({ file }) => {
      console.log("File produk berhasil di-upload:", file.url);
      return { url: file.url };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;