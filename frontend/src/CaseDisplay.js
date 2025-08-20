import React from 'react';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReactMarkdown from 'react-markdown';

const CaseDisplay = ({ caseData }) => {
  if (!caseData) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Generated Case Study</h2>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={() => {
            navigator.clipboard.writeText(caseData);
          }}
          sx={{ textTransform: 'none' }}
        >
          Copy to Clipboard
        </Button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8">
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown 
              components={{
                h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">{children}</h1>,
                h2: ({children}) => <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">{children}</h2>,
                h3: ({children}) => <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">{children}</h3>,
                h4: ({children}) => <h4 className="text-base font-medium text-gray-800 mb-2 mt-3">{children}</h4>,
                p: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                li: ({children}) => (
                  <li className="text-gray-700">
                    <span className="block ml-1">{children}</span>
                  </li>
                ),
                strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-800">{children}</em>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-200 pl-4 py-2 mb-4 bg-blue-50 text-gray-700 italic">{children}</blockquote>
              }}
            >
              {caseData}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDisplay;
