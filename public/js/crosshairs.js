const API_URL = '/api/crosshairs';

let allCrosshairs = [];
let currentFilters = { category: '', color: '' };
let editingCrosshairId = null;
let searchQuery = '';
let selectedImageBase64 = null;
let currentUser = null;

// Auth helper - check if already defined
if (!window.auth) {
  window.auth = {
    isLoggedIn: () => localStorage.getItem('user') !== null,
    getCurrentUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
    saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
    clearUser: () => localStorage.removeItem('user')
  };
}

currentUser = window.auth.getCurrentUser();

// Check for user filter in URL
const urlParams = new URLSearchParams(window.location.search);
const userFilterId = urlParams.get('user');

const modal = document.getElementById('crosshairModal');
const form = document.getElementById('crosshairForm');
const addBtn = document.getElementById('addCrosshairBtn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const imageInput = document.getElementById('crosshairImage');
const imagePreview = document.getElementById('imagePreview');

// Disable add button if not logged in
if (!currentUser) {
  addBtn.disabled = true;
  addBtn.title = 'Please login to add crosshairs';
  addBtn.style.opacity = '0.5';
  addBtn.style.cursor = 'not-allowed';
}

const colorMap = {
  White: '#ffffff',
  Green: '#00ff88',
  Yellow: '#ffd966',
  Cyan: '#00d1ff',
  Red: '#ff4655',
  Pink: '#ff69b4',
  Purple: '#a855f7',
  Blue: '#3b82f6',
};

// Compress image function
function compressImage(base64Str, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    img.src = base64Str;
  });
}

// Image upload handler
imageInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const compressed = await compressImage(event.target.result);
        selectedImageBase64 = compressed;
        
        imagePreview.innerHTML = `
          <img src="${compressed}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
          <button type="button" class="btn btn-secondary" style="margin-top: 10px;" onclick="clearImage()">Remove Image</button>
        `;
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Failed to process image. Please try a different image.');
      }
    };
    reader.readAsDataURL(file);
  }
});

window.clearImage = function () {
  selectedImageBase64 = null;
  imageInput.value = '';
  imagePreview.innerHTML = '';
};

// Search functionality
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  applyFiltersAndSearch();
});

function applyFiltersAndSearch() {
  let filtered = allCrosshairs;

  if (currentFilters.category) {
    filtered = filtered.filter((c) => c.category === currentFilters.category);
  }
  if (currentFilters.color) {
    filtered = filtered.filter((c) => c.color === currentFilters.color);
  }

  if (searchQuery) {
    filtered = filtered.filter((crosshair) => {
      return (
        crosshair.name.toLowerCase().includes(searchQuery) ||
        crosshair.category.toLowerCase().includes(searchQuery) ||
        crosshair.color.toLowerCase().includes(searchQuery) ||
        (crosshair.description &&
          crosshair.description.toLowerCase().includes(searchQuery)) ||
        (crosshair.author &&
          crosshair.author.toLowerCase().includes(searchQuery))
      );
    });
  }

  renderCrosshairs(filtered);
}

async function fetchCrosshairs(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.color) params.append('color', filters.color);
    
    if (userFilterId) {
      params.append('userId', userFilterId);
    }

    // FIXED: Send current user ID in headers so backend can show their private items
    const headers = {};
    if (currentUser) {
      headers['x-user-id'] = currentUser._id;
    }

    const response = await fetch(`${API_URL}?${params}`, { headers });
    const crosshairs = await response.json();
    allCrosshairs = crosshairs;
    applyFiltersAndSearch();
  } catch (error) {
    console.error('Error fetching crosshairs:', error);
    showError('Failed to load crosshairs');
  }
}

function renderCrosshairs(crosshairs) {
  const container = document.getElementById('crosshairsContainer');
  const countEl = document.getElementById('crosshairCount');

  if (userFilterId && currentUser && userFilterId === currentUser._id) {
    countEl.textContent = `Showing ${crosshairs.length} of your crosshair${crosshairs.length !== 1 ? 's' : ''}`;
  } else {
    countEl.textContent = `Showing ${crosshairs.length} crosshair${crosshairs.length !== 1 ? 's' : ''}`;
  }

  if (crosshairs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No crosshairs found</h3>
        <p>Try adjusting your filters or search, or add a new crosshair!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = crosshairs
    .map(
      (crosshair) => {
        const canEdit = currentUser && crosshair.userId && crosshair.userId.toString() === currentUser._id;
        
        return `
    <div class="crosshair-card" data-id="${crosshair._id}">
      <div class="crosshair-header">
        <div class="crosshair-name">${crosshair.name}</div>
        <div class="crosshair-actions">
          ${canEdit ? `
            <button class="icon-btn edit" onclick="editCrosshair('${crosshair._id}')" title="Edit">✏️</button>
            <button class="icon-btn delete" onclick="deleteCrosshair('${crosshair._id}')" title="Delete">🗑️</button>
          ` : ''}
        </div>
      </div>
      
      ${
        crosshair.imageUrl
          ? `<div class="crosshair-image">
          <img src="${crosshair.imageUrl}" alt="${crosshair.name}" />
        </div>`
          : `<div class="crosshair-preview">
        <div class="crosshair-visual">
          <div class="crosshair-line top" style="background-color: ${colorMap[crosshair.color]}; width: ${crosshair.thickness}px; height: ${crosshair.length}px;"></div>
          <div class="crosshair-line bottom" style="background-color: ${colorMap[crosshair.color]}; width: ${crosshair.thickness}px; height: ${crosshair.length}px;"></div>
          <div class="crosshair-line left" style="background-color: ${colorMap[crosshair.color]}; height: ${crosshair.thickness}px; width: ${crosshair.length}px;"></div>
          <div class="crosshair-line right" style="background-color: ${colorMap[crosshair.color]}; height: ${crosshair.thickness}px; width: ${crosshair.length}px;"></div>
          ${crosshair.centerDot ? `<div class="crosshair-center-dot" style="background-color: ${colorMap[crosshair.color]}; width: ${crosshair.thickness * 2}px; height: ${crosshair.thickness * 2}px;"></div>` : ''}
        </div>
      </div>`
      }
      
      <div class="crosshair-meta">
        <span class="tag category">${crosshair.category}</span>
        <span class="tag color">${crosshair.color}</span>
        ${crosshair.isPrivate ? `<span class="tag private">🔒 Private</span>` : ''}
      </div>
      
      <div class="crosshair-code" onclick="copyCrosshairCode('${crosshair.code}')" title="Click to copy">
        ${crosshair.code}
      </div>
      
      ${crosshair.description ? `<div class="crosshair-description">${crosshair.description}</div>` : ''}
      
      <div class="crosshair-footer">
        <span>by ${crosshair.author || 'Anonymous'}</span>
        <button class="copy-btn" onclick="copyCrosshairCode('${crosshair.code}')">Copy Code</button>
      </div>
    </div>
  `;
      }
    )
    .join('');
}

async function deleteCrosshair(id) {
  if (!currentUser) {
    alert('Please login to delete crosshairs');
    return;
  }

  if (!confirm('Are you sure you want to delete this crosshair?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchCrosshairs(currentFilters);
      showSuccess('Crosshair deleted successfully');
    } else {
      const data = await response.json();
      showError(data.error || 'Failed to delete crosshair');
    }
  } catch (error) {
    console.error('Error deleting crosshair:', error);
    showError('Failed to delete crosshair');
  }
}

async function editCrosshair(id) {
  if (!currentUser) {
    alert('Please login to edit crosshairs');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const crosshair = await response.json();

    editingCrosshairId = id;
    document.getElementById('modalTitle').textContent = 'Edit Crosshair';
    document.getElementById('crosshairId').value = id;
    document.getElementById('crosshairName').value = crosshair.name;
    document.getElementById('crosshairCode').value = crosshair.code;
    document.getElementById('crosshairCategory').value = crosshair.category;
    document.getElementById('crosshairColor').value = crosshair.color;
    document.getElementById('crosshairThickness').value =
      crosshair.thickness || 2;
    document.getElementById('crosshairLength').value = crosshair.length || 6;
    document.getElementById('crosshairCenterDot').checked =
      crosshair.centerDot || false;
    document.getElementById('crosshairOutlines').checked =
      crosshair.outlines || false;
    document.getElementById('crosshairDescription').value =
      crosshair.description || '';
    document.getElementById('crosshairAuthor').value = crosshair.author || currentUser.username;
    document.getElementById('crosshairPrivate').checked = crosshair.isPrivate || false;

    if (crosshair.imageUrl) {
      selectedImageBase64 = crosshair.imageUrl;
      imagePreview.innerHTML = `
        <img src="${crosshair.imageUrl}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
        <button type="button" class="btn btn-secondary" style="margin-top: 10px;" onclick="clearImage()">Remove Image</button>
      `;
    }

    modal.style.display = 'block';
  } catch (error) {
    console.error('Error fetching crosshair:', error);
    showError('Failed to load crosshair');
  }
}

function copyCrosshairCode(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      showSuccess('Crosshair code copied to clipboard!');
    })
    .catch(() => {
      showError('Failed to copy code');
    });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert('Please login to save crosshairs');
    return;
  }

  const crosshairData = {
    name: document.getElementById('crosshairName').value,
    code: document.getElementById('crosshairCode').value,
    category: document.getElementById('crosshairCategory').value,
    color: document.getElementById('crosshairColor').value,
    thickness: parseInt(document.getElementById('crosshairThickness').value),
    length: parseInt(document.getElementById('crosshairLength').value),
    centerDot: document.getElementById('crosshairCenterDot').checked,
    outlines: document.getElementById('crosshairOutlines').checked,
    description: document.getElementById('crosshairDescription').value,
    author: document.getElementById('crosshairAuthor').value || currentUser.username,
    imageUrl: selectedImageBase64,
    userId: currentUser._id,
    isPrivate: document.getElementById('crosshairPrivate').checked,
  };

  try {
    const url = editingCrosshairId
      ? `${API_URL}/${editingCrosshairId}`
      : API_URL;
    const method = editingCrosshairId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crosshairData),
    });

    if (response.ok) {
      // FIXED: Refetch with current filters to show the newly created crosshair
      if (userFilterId && userFilterId === currentUser._id) {
        // Viewing "My Crosshairs" - refetch with userId filter
        currentFilters.userId = currentUser._id;
      }
      await fetchCrosshairs(currentFilters);
      closeModal();
      showSuccess(
        editingCrosshairId
          ? 'Crosshair updated successfully'
          : 'Crosshair created successfully'
      );
    } else {
      const errorData = await response.json();
      showError(errorData.error || 'Failed to save crosshair');
    }
  } catch (error) {
    console.error('Error saving crosshair:', error);
    showError('Failed to save crosshair. The image might be too large.');
  }
});

function closeModal() {
  modal.style.display = 'none';
  form.reset();
  editingCrosshairId = null;
  selectedImageBase64 = null;
  imagePreview.innerHTML = '';
  document.getElementById('modalTitle').textContent = 'Add New Crosshair';
}

addBtn.addEventListener('click', () => {
  if (!currentUser) {
    alert('Please login to add crosshairs');
    window.location.href = '/login.html';
    return;
  }
  closeModal();
  document.getElementById('crosshairAuthor').value = currentUser.username;
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.getElementById('categoryFilter').addEventListener('change', (e) => {
  currentFilters.category = e.target.value;
  applyFiltersAndSearch();
});

document.getElementById('colorFilter').addEventListener('change', (e) => {
  currentFilters.color = e.target.value;
  applyFiltersAndSearch();
});

document.getElementById('resetFilters').addEventListener('click', () => {
  currentFilters = { category: '', color: '' };
  searchQuery = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('colorFilter').value = '';
  searchInput.value = '';
  
  if (userFilterId) {
    window.location.href = '/crosshairs.html';
  } else {
    fetchCrosshairs();
  }
});

function showSuccess(message) {
  alert(message);
}

function showError(message) {
  alert(message);
}

window.deleteCrosshair = deleteCrosshair;
window.editCrosshair = editCrosshair;
window.copyCrosshairCode = copyCrosshairCode;

// FIXED: Apply filters on initial load
if (userFilterId) {
  currentFilters.userId = userFilterId;
}
fetchCrosshairs(currentFilters);