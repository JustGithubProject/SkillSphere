import React, { useState } from 'react';

const LoginForm = () => {
    return (
    <form onSubmit={handleSubmit} className="form-box">
      <h3 className="h4 text-black mb-4">Sign Up</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          className="btn btn-primary btn-pill"
          value="Sign up"
        />
      </div>
    </form>
    );
};

export default LoginForm;