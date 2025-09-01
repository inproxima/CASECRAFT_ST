import React, { useState } from 'react';
import CaseForm from './CaseForm';
import SocialWorkForm from './SocialWorkForm';
import NursingForm from './NursingForm';
import BusinessForm from './BusinessForm';
import BGCDSBForm from './BGCDSBForm';
import CaseDisplay from './CaseDisplay';
import { generateCase } from './api';
import { Button, Stack, CircularProgress, Box, Skeleton } from '@mui/material';

function App() {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenerator, setSelectedGenerator] = useState('education');

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateCase(formData);
      console.log('Received data:', data); // Added for debugging
      setCaseData(data);
    } catch (err) {
      console.error('Error in handleGenerate:', err); // Added for debugging
      setError('Failed to generate case. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (selectedGenerator) {
      case 'education':
        return <CaseForm onGenerate={handleGenerate} loading={loading} />;
      case 'social-work':
        return <SocialWorkForm onGenerate={handleGenerate} loading={loading} />;
      case 'nursing':
        return <NursingForm onGenerate={handleGenerate} loading={loading} />;
      case 'business':
        return <BusinessForm onGenerate={handleGenerate} loading={loading} />;
      case 'bgcdsb':
        return <BGCDSBForm onGenerate={handleGenerate} loading={loading} />;
      default:
        return <CaseForm onGenerate={handleGenerate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-2xl font-bold text-gray-800">CaseCraft</h1>
          <nav>
            <Stack spacing={1} direction="row">
              <Button
                variant={selectedGenerator === 'education' ? 'contained' : 'text'}
                onClick={() => setSelectedGenerator('education')}
                size="small"
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Education
              </Button>
              <Button
                variant={selectedGenerator === 'social-work' ? 'contained' : 'text'}
                onClick={() => setSelectedGenerator('social-work')}
                size="small"
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Social Work
              </Button>
              <Button
                variant={selectedGenerator === 'nursing' ? 'contained' : 'text'}
                onClick={() => setSelectedGenerator('nursing')}
                size="small"
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Nursing
              </Button>
              <Button
                variant={selectedGenerator === 'business' ? 'contained' : 'text'}
                onClick={() => setSelectedGenerator('business')}
                size="small"
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Business
              </Button>
              <Button
                variant={selectedGenerator === 'bgcdsb' ? 'contained' : 'text'}
                onClick={() => setSelectedGenerator('bgcdsb')}
                size="small"
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                BGCDSB Builder
              </Button>
            </Stack>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar - Form Controls */}
        <div className="w-80 bg-white shadow-md border-r overflow-y-auto">
          <div className="p-6">
            {renderForm()}
            {loading && (
              <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 2,
                  textAlign: 'center'
                }}>
                  <CircularProgress size={24} thickness={4} />
                  <p className="text-blue-700 text-sm font-medium">Generating your case study...</p>
                  <p className="text-blue-600 text-xs">This may take a few moments</p>
                </Box>
              </div>
            )}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Main Content - Case Display */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {loading ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Skeleton variant="text" width={300} height={40} />
                  <Skeleton variant="rectangular" width={150} height={36} />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-8">
                    <div className="space-y-4">
                      <Skeleton variant="text" width="100%" height={32} />
                      <Skeleton variant="text" width="90%" height={24} />
                      <Skeleton variant="text" width="95%" height={24} />
                      <Skeleton variant="text" width="85%" height={24} />
                      <Box sx={{ mt: 3 }}>
                        <Skeleton variant="text" width="60%" height={28} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="95%" height={20} />
                        <Skeleton variant="text" width="88%" height={20} />
                        <Skeleton variant="text" width="92%" height={20} />
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        <Skeleton variant="text" width="70%" height={28} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="85%" height={20} />
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        <Skeleton variant="text" width="55%" height={28} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="95%" height={20} />
                        <Skeleton variant="text" width="80%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="75%" height={20} />
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            ) : caseData ? (
              <CaseDisplay caseData={caseData} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No case generated yet</h3>
                  <p className="text-gray-500">Fill out the form on the left and click "Generate Case" to get started.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
