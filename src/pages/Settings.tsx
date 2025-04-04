import React from 'react';

const Settings = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Settings</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Enter username" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <button type="submit" className="btn btn-info">Save Settings</button>
      </form>
    </div>
  );
};
export default Settings;