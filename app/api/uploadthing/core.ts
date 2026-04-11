import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = () => ({ id: "user_id_palsu" }); 

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = auth();
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gambar berhasil di-upload:", file.url);
      return { url: file.url };
    }),

  productFileUploader: f({
    // Tambahkan konfigurasi ini agar menerima PDF dan ZIP
    pdf: { maxFileSize: "32MB" },
    blob: { maxFileSize: "32MB" }, // Blob ini kunci agar ZIP/RAR bisa masuk
  })
    .middleware(async ({ req }) => {
      // Logika proteksi login Anda...
      return { userId: "user_id" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;              