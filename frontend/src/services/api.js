import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Contact Form Submission
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API}/contact/submit`, {
      ...formData,
      submission_type: 'contact'
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { 
      success: false, 
      error: error.response?.data?.detail || 'Failed to submit form. Please try again.' 
    };
  }
};

// Demo Request
export const requestDemo = async (email, source = 'navbar') => {
  try {
    const response = await axios.post(`${API}/demo/request`, {
      email,
      source
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Demo request error:', error);
    return { 
      success: false, 
      error: error.response?.data?.detail || 'Failed to submit demo request. Please try again.' 
    };
  }
};

// Get Submission Stats (for admin)
export const getSubmissionStats = async () => {
  try {
    const response = await axios.get(`${API}/stats`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Stats fetch error:', error);
    return { success: false, error: 'Failed to fetch stats' };
  }
};
