const currentUser = window.auth.getCurrentUser();

if (!currentUser) {
  window.location.href = '/login.html';
}

let selectedProfilePicture = null;
let selectedProfileMode = 'agent';
let selectedAgentName = '';

const rankImages = {
  'Unranked': '/images/ranks/unranked.png',
  'Iron': '/images/ranks/iron.png',
  'Bronze': '/images/ranks/bronze.png',
  'Silver': '/images/ranks/silver.png',
  'Gold': '/images/ranks/gold.png',
  'Platinum': '/images/ranks/platinum.png',
  'Diamond': '/images/ranks/diamond.png',
  'Ascendant': '/images/ranks/ascendant.png',
  'Immortal': '/images/ranks/immortal.png',
  'Radiant': '/images/ranks/radiant.png',
};

function compressImage(base64Str, maxWidth = 400, maxHeight = 400, quality = 0.8) {
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

async function loadProfile() {
  try {
    const response = await fetch(`/api/auth/profile/${currentUser._id}`);
    const data = await response.json();

    if (response.ok) {
      const { user, stats } = data;

      document.getElementById('displayUsername').textContent = user.username;
      document.getElementById('displayEmail').textContent = user.email;
      document.getElementById('displayRank').textContent = user.rank || 'Unranked';
      document.getElementById('displayBio').textContent = user.bio || 'No bio yet';
      
      if (user.profilePicture) {
        document.getElementById('profilePicture').src = user.profilePicture;
      }

      const rank = user.rank || 'Unranked';
      const rankImageUrl = rankImages[rank];
      if (rankImageUrl) {
        const rankBadgeImg = document.getElementById('rankBadge');
        rankBadgeImg.src = rankImageUrl;
        rankBadgeImg.style.display = 'block';
        rankBadgeImg.onerror = () => {
          rankBadgeImg.style.display = 'none';
        };
      }

      if (user.favoriteAgent) {
        document.getElementById('displayFavoriteAgent').innerHTML = `
          <strong>Main:</strong> ${user.favoriteAgent}
        `;
      }

      document.getElementById('userLineups').textContent = stats.lineups;
      document.getElementById('userCrosshairs').textContent = stats.crosshairs;
      document.getElementById('totalContributions').textContent = stats.total;
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    alert('Failed to load profile');
  }
}

const editModal = document.getElementById('editProfileModal');
const editBtn = document.getElementById('editProfileBtn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelEditBtn');
const editForm = document.getElementById('editProfileForm');
const profilePictureInput = document.getElementById('editProfilePicture');
const profilePicturePreview = document.getElementById('profilePicturePreview');

const selectAgentBtn = document.getElementById('selectAgentBtn');
const uploadCustomBtn = document.getElementById('uploadCustomBtn');
const agentSelectionSection = document.getElementById('agentSelectionSection');
const customUploadSection = document.getElementById('customUploadSection');

selectAgentBtn.addEventListener('click', () => {
  selectedProfileMode = 'agent';
  selectAgentBtn.classList.add('active');
  uploadCustomBtn.classList.remove('active');
  agentSelectionSection.style.display = 'block';
  customUploadSection.style.display = 'none';
});

uploadCustomBtn.addEventListener('click', () => {
  selectedProfileMode = 'custom';
  uploadCustomBtn.classList.add('active');
  selectAgentBtn.classList.remove('active');
  customUploadSection.style.display = 'block';
  agentSelectionSection.style.display = 'none';
});

document.getElementById('agentGrid').addEventListener('click', (e) => {
  const agentOption = e.target.closest('.agent-option');
  if (agentOption) {
    document.querySelectorAll('.agent-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    
    agentOption.classList.add('selected');
    selectedAgentName = agentOption.dataset.agent;
    selectedProfilePicture = `/images/agents/${selectedAgentName}.png`;
  }
});

profilePictureInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const compressed = await compressImage(event.target.result);
        selectedProfilePicture = compressed;
        
        profilePicturePreview.innerHTML = `
          <img src="${compressed}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 50%; border: 3px solid var(--primary-color);">
        `;
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Failed to process image.');
      }
    };
    reader.readAsDataURL(file);
  }
});

editBtn.addEventListener('click', () => {
  document.getElementById('editUsername').value = currentUser.username;
  document.getElementById('editBio').value = currentUser.bio || '';
  document.getElementById('editRank').value = currentUser.rank || 'Unranked';
  document.getElementById('editFavoriteAgent').value = currentUser.favoriteAgent || '';
  
  if (currentUser.profilePicture && currentUser.profilePicture.startsWith('/images/agents/')) {
    selectedProfileMode = 'agent';
    const agentName = currentUser.profilePicture.split('/').pop().replace('.png', '');
    selectedAgentName = agentName;
    selectedProfilePicture = currentUser.profilePicture;
    
    const agentOption = document.querySelector(`[data-agent="${agentName}"]`);
    if (agentOption) {
      agentOption.classList.add('selected');
    }
    
    agentSelectionSection.style.display = 'block';
    customUploadSection.style.display = 'none';
    selectAgentBtn.classList.add('active');
    uploadCustomBtn.classList.remove('active');
  } else if (currentUser.profilePicture) {
    selectedProfileMode = 'custom';
    selectedProfilePicture = currentUser.profilePicture;
    
    profilePicturePreview.innerHTML = `
      <img src="${currentUser.profilePicture}" alt="Current" style="max-width: 200px; max-height: 200px; border-radius: 50%; border: 3px solid var(--primary-color);">
    `;
    
    agentSelectionSection.style.display = 'none';
    customUploadSection.style.display = 'block';
    uploadCustomBtn.classList.add('active');
    selectAgentBtn.classList.remove('active');
  }
  
  editModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
  resetForm();
});

cancelBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
  resetForm();
});

function resetForm() {
  selectedProfilePicture = null;
  selectedAgentName = '';
  selectedProfileMode = 'agent';
  profilePicturePreview.innerHTML = '';
  
  document.querySelectorAll('.agent-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  agentSelectionSection.style.display = 'block';
  customUploadSection.style.display = 'none';
  selectAgentBtn.classList.add('active');
  uploadCustomBtn.classList.remove('active');
}

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const selectedRank = document.getElementById('editRank').value;
  const rankImageUrl = rankImages[selectedRank];

  const updateData = {
    username: document.getElementById('editUsername').value,
    bio: document.getElementById('editBio').value,
    rank: selectedRank,
    rankImage: rankImageUrl,
    favoriteAgent: document.getElementById('editFavoriteAgent').value,
    profilePicture: selectedProfilePicture,
  };

  try {
    const response = await fetch(`/api/auth/profile/${currentUser._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (response.ok) {
      window.auth.saveUser(data.user);
      alert('Profile updated successfully!');
      editModal.style.display = 'none';
      resetForm();
      window.location.reload();
    } else {
      alert(data.error || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile');
  }
});

document.getElementById('viewMyLineupsBtn').addEventListener('click', () => {
  window.location.href = `/lineups.html?user=${currentUser._id}`;
});

document.getElementById('viewMyCrosshairsBtn').addEventListener('click', () => {
  window.location.href = `/crosshairs.html?user=${currentUser._id}`;
});

document.getElementById('logoutLink').addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('Are you sure you want to logout?')) {
    window.auth.clearUser();
    window.location.href = '/';
  }
});

loadProfile();