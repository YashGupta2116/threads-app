import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {useProfileStore} from '@/store/useProfileStore';
import {Eye, EyeOff} from 'lucide-react';

const EditProfileModal = ({isOpen, onClose}) => {
  const {userProfile, editProfile} = useProfileStore();

  // Form Data State
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: '',
  });

  // State for visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error messages
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        fullName: userProfile.fullName || '',
        email: userProfile.email || '',
        bio: userProfile.bio || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [userProfile]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (formData.password) {
      if (formData.password.length < 6)
        newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) return;
    editProfile(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm' />
      <DialogContent className='fixed top-1/2 left-1/2 transform -translate-x-1/2 w-96 bg-white p-6 rounded-xl shadow-lg'>
        <DialogTitle className='text-xl font-semibold'>
          Edit Profile
        </DialogTitle>
        <DialogDescription className='text-sm text-gray-600 mb-4'>
          Update your profile information here.
        </DialogDescription>

        <div className='space-y-4'>
          <label className='block text-sm font-medium'>Full Name</label>
          <Input
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className='text-red-500 text-sm'>{errors.fullName}</p>
          )}

          <label className='block text-sm font-medium'>Username</label>
          <Input
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className='text-red-500 text-sm'>{errors.username}</p>
          )}

          <label className='block text-sm font-medium'>Email</label>
          <Input name='email' value={formData.email} onChange={handleChange} />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}

          <label className='block text-sm font-medium'>Bio</label>
          <Input name='bio' value={formData.bio} onChange={handleChange} />

          {/* Password with Toggle */}
          <label className='block text-sm font-medium'>Password</label>
          <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type='button'
              className='absolute right-3 top-2 text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password}</p>
          )}

          {/* Confirm Password with Toggle */}
          <label className='block text-sm font-medium'>Confirm Password</label>
          <div className='relative'>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type='button'
              className='absolute right-3 top-2 text-gray-500'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>
          )}
        </div>

        {/* Buttons */}
        <div className='flex justify-end space-x-2 mt-6'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
