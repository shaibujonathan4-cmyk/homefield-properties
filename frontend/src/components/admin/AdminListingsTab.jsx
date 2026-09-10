import { useState } from 'react';
import { useProperties } from '../../context/PropertyContext.jsx';
import AdminPropertyForm from './AdminPropertyForm.jsx';

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

export default function AdminListingsTab() {
  const { properties, loading, addProperty, updateProperty, deleteProperty } = useProperties();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const handleAddNew = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id, payload);
    } else {
      await addProperty(payload);
    }
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      await deleteProperty(id);
    }
  };

  if (isFormOpen) {
    return (
      <div>
        <h1>{editingProperty ? 'Edit listing' : 'Add new listing'}</h1>
        <AdminPropertyForm
          initialData={editingProperty}
          onSave={handleSave}
          onCancel={() => setIsFormOpen(false)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-tab-header">
        <h1>Listings</h1>
        <button className="admin-add-button" onClick={handleAddNew}>
          + Add listing
        </button>
      </div>

      {loading ? (
        <p>Loading listings...</p>
      ) : properties.length === 0 ? (
        <p>No listings yet. Add your first one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td data-label="Title">{p.title}</td>
                <td data-label="Category">{p.category}</td>
                <td data-label="Price">{formatNaira(p.price)}{p.priceLabel ? ` ${p.priceLabel}` : ''}</td>
                <td data-label="Location">{p.location}</td>
                <td className="admin-table-actions" data-label="">
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button className="admin-delete" onClick={() => handleDelete(p.id, p.title)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}