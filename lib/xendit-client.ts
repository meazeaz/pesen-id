// lib/xendit-client.ts
import Xendit from "xendit-node";

// Buat koneksi ke Xendit menggunakan kunci rahasia
const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY!,
});

// Kita hanya butuh fitur Invoice
export const invoiceClient = xendit.Invoice;