import React from 'react';

export function Utility() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Utility Tools</h1>
        <p className="text-gray-600 mt-2">Helpful tools for development and testing</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">JSON Validator</h3>
            <p className="text-sm text-gray-500 mt-1">Validate JSON data</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">URL Encoder</h3>
            <p className="text-sm text-gray-500 mt-1">Encode/decode URLs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
