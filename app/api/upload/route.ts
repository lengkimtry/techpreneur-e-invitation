export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json({ error: "Cloudinary not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "techpreneur-logos";

  // Cloudinary signature: SHA-1(sorted_params + api_secret)
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-1", encoder.encode(paramsToSign + apiSecret));
  const signature = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("api_key", apiKey);
  uploadForm.append("timestamp", timestamp.toString());
  uploadForm.append("signature", signature);
  uploadForm.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadForm,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return Response.json(
      { error: (err as { error?: { message?: string } }).error?.message ?? "Upload failed" },
      { status: 500 }
    );
  }

  const result = (await res.json()) as { secure_url: string };
  return Response.json({ url: result.secure_url });
}
