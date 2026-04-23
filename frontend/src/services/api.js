import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
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

// Demo Request (Updated for detailed form)
export const requestDemo = async (email, source = 'navbar', fullData = {}) => {
  try {
    const response = await axios.post(`${API}/demo/request`, {
      ...fullData,
      email: email || fullData.email,
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

// Newsletter Subscription
export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API}/newsletter/subscribe`, { email });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { 
      success: false, 
      error: error.response?.data?.detail || 'Failed to subscribe to newsletter.' 
    };
  }
};

// Admin: Get all demo requests
export const getAllDemoRequests = async () => {
  try {
    const response = await axios.get(`${API}/demo/requests`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Fetch demo requests error:', error);
    return { success: false, error: 'Failed to fetch demo requests' };
  }
};

// Admin: Get all contact submissions
export const getAllContactSubmissions = async () => {
  try {
    const response = await axios.get(`${API}/contact/submissions`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Fetch contact submissions error:', error);
    return { success: false, error: 'Failed to fetch contact submissions' };
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
