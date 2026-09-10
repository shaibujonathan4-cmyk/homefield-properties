import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase.js';
import './AdminPropertyForm.css';

const CATEGORIES = [
  { label: 'Homes', slug: 'homes' },
  { label: 'Self Contained', slug: 'self-contained' },
  { label: 'Shops', slug: 'shops' },
  { label: 'Lands', slug: 'lands' },
];

const emptyForm = {
  title: '',
  category: '',
  categorySlug: '',
  price: '',
  priceLabel: '',
  location: '',
  description: '',
  rooms: '',
  bathrooms: '',
  size: '',
  extras: '',
};

export default function AdminPropertyForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        category: initialData.category || '',
        categorySlug: initialData.categorySlug || '',
        price: initialData.price || '',
        priceLabel: initialData.priceLabel || '',
        location: initialData.location || '',
        description: initialData.description || '',
        rooms: initialData.specs?.rooms ?? '',
        bathrooms: initialData.specs?.bathrooms ?? '',
        size: initialData.specs?.size || '',
        extras: initialData.specs?.extras || '',
      });
      setExistingImages(initialData.images || []);
    } else {
      setForm(emptyForm);
      setExistingImages([]);
    }
    setNewFiles([]);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categorySlug') {
      const match = CATEGORIES.find((c) => c.slug === value);
      setForm({ ...form, categorySlug: value, category: match?.label || '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Upload any newly selected files to Firebase Storage
    const uploadedUrls = [];
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      setUploadProgress(`Uploading image ${i + 1} of ${newFiles.length}...`);
      const storageRef = ref(storage, `properties/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      uploadedUrls.push(url);
    }
    setUploadProgress('');

    const payload = {
      title: form.title,
      category: form.category,
      categorySlug: form.categorySlug,
      price: Number(form.price),
      priceLabel: form.priceLabel,
      location: form.location,
      description: form.description,
      images: [...existingImages, ...uploadedUrls],
      specs: {
        rooms: form.rooms,
        bathrooms: form.bathrooms,
        size: form.size,
        extras: form.extras,
      },
    };

    await onSave(payload);
    setIsSaving(false);
  };

  return (
    <form className="admin-property-form" onSubmit={handleSubmit}>
      <div className="admin-form-row">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Category
          <select name="categorySlug" value={form.categorySlug} onChange={handleChange} required>
            <option value="" disabled>Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          Price (₦)
          <input name="price" type="number" value={form.price} onChange={handleChange} required />
        </label>
        <label>
          Price label (e.g. "/ yr", leave blank for outright)
          <input name="priceLabel" value={form.priceLabel} onChange={handleChange} />
        </label>
      </div>

      <label>
        Location
        <input name="location" value={form.location} onChange={handleChange} required />
      </label>

      <div className="admin-form-row">
        <label>
          Rooms
          <input name="rooms" value={form.rooms} onChange={handleChange} placeholder="e.g. 2 or -" />
        </label>
        <label>
          Bathrooms
          <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="e.g. 1 or -" />
        </label>
        <label>
          Size
          <input name="size" value={form.size} onChange={handleChange} placeholder="e.g. 45 sqm" />
        </label>
      </div>

      <label>
        Extras
        <input name="extras" value={form.extras} onChange={handleChange} placeholder="e.g. Water & power included" />
      </label>

      <label>
        Description
        <textarea name="description" rows={4} value={form.description} onChange={handleChange} required />
      </label>

      <label>
        Photos
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </label>

      {existingImages.length > 0 && (
        <div className="admin-image-preview-list">
          {existingImages.map((url) => (
            <div key={url} className="admin-image-preview">
              <img src={url} alt="" />
              <button type="button" onClick={() => removeExistingImage(url)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {uploadProgress && <p className="admin-upload-progress">{uploadProgress}</p>}

      <div className="admin-form-actions">
        <button type="button" className="admin-form-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="admin-form-save" disabled={isSaving}>
          {isSaving ? <span className="spinner" /> : 'Save listing'}
        </button>
      </div>
    </form>
  );
}