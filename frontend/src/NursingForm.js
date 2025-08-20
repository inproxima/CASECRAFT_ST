import React, { useState } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const NursingForm = ({ onGenerate, loading = false }) => {
  const [formData, setFormData] = useState({
    setting: 'Medical-Surgical Unit',
    case_category: 'Medical-Surgical Nursing',
    options: 'post-operative care and complications',
    context: 'Acute care hospital',
    user_context: '',
  });

  const nursingCategories = {
    "Medical-Surgical Nursing": [
      "post-operative care and complications",
      "chronic disease management",
      "medication administration and safety",
      "wound care and infection prevention",
      "patient education and discharge planning"
    ],
    "Critical Care Nursing": [
      "hemodynamic monitoring and support",
      "mechanical ventilation management",
      "multi-organ failure scenarios",
      "end-of-life care in ICU",
      "family communication in crisis"
    ],
    "Emergency Nursing": [
      "triage decision making",
      "trauma assessment and stabilization",
      "psychiatric emergencies",
      "mass casualty incidents",
      "pediatric emergency care"
    ],
    "Pediatric Nursing": [
      "developmental considerations in care",
      "family-centered care approaches",
      "pediatric pain management",
      "child abuse recognition and reporting",
      "chronic illness in children"
    ],
    "Maternal-Newborn Nursing": [
      "high-risk pregnancy complications",
      "labor and delivery emergencies",
      "postpartum depression and support",
      "breastfeeding challenges",
      "neonatal intensive care"
    ],
    "Mental Health Nursing": [
      "therapeutic communication techniques",
      "suicide risk assessment and prevention",
      "medication compliance challenges",
      "de-escalation of aggressive behavior",
      "dual diagnosis care"
    ],
    "Geriatric Nursing": [
      "falls prevention and safety",
      "dementia care and behavior management",
      "polypharmacy and drug interactions",
      "end-of-life decision making",
      "elder abuse recognition"
    ],
    "Community Health Nursing": [
      "health promotion and disease prevention",
      "vulnerable population care",
      "cultural competency in diverse communities",
      "health education and literacy",
      "resource coordination and advocacy"
    ],
    "Oncology Nursing": [
      "chemotherapy administration and side effects",
      "pain and symptom management",
      "psychosocial support for patients and families",
      "infection prevention in immunocompromised patients",
      "palliative and hospice care"
    ],
    "Perioperative Nursing": [
      "pre-operative assessment and preparation",
      "intraoperative patient advocacy",
      "post-anesthesia care complications",
      "surgical site infection prevention",
      "patient safety in the OR"
    ],
    "Cardiac Nursing": [
      "acute coronary syndrome management",
      "heart failure patient education",
      "cardiac rehabilitation support",
      "arrhythmia monitoring and intervention",
      "post-cardiac surgery care"
    ],
    "Rehabilitation Nursing": [
      "functional assessment and goal setting",
      "adaptive equipment and mobility",
      "patient and family education for independence",
      "chronic pain management",
      "community reintegration planning"
    ]
  };

  const settingOptions = [
    "Medical-Surgical Unit",
    "Intensive Care Unit",
    "Emergency Department",
    "Pediatric Unit",
    "Labor and Delivery",
    "Mental Health Unit",
    "Long-term Care Facility",
    "Community Health Center",
    "Oncology Unit",
    "Operating Room",
    "Cardiac Care Unit",
    "Rehabilitation Center"
  ];

  const contextOptions = [
    "Acute care hospital",
    "Critical access hospital",
    "Teaching hospital",
    "Community hospital",
    "Outpatient clinic",
    "Home health care",
    "Rural healthcare setting",
    "Urban trauma center",
    "Specialty care facility",
    "Long-term care facility"
  ];

  const [categories] = useState(nursingCategories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === 'case_category') {
        newData.options = categories[value][0];
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...formData, generator_type: 'nursing' });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Configure Your Nursing Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
            Clinical Setting
          </label>
          <div className="relative">
            <select
              id="setting"
              name="setting"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.setting}
              onChange={handleChange}
            >
              {settingOptions.map((setting) => (
                <option key={setting} value={setting}>
                  {setting}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="case_category" className="block text-sm font-medium text-gray-700 mb-2">
            Nursing Specialty
          </label>
          <div className="relative">
            <select
              id="case_category"
              name="case_category"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.case_category}
              onChange={handleChange}
            >
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-2">
            Clinical Focus
          </label>
          <div className="relative">
            <select
              id="options"
              name="options"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.options}
              onChange={handleChange}
            >
              {categories[formData.case_category]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
            Healthcare Context
          </label>
          <div className="relative">
            <select
              id="context"
              name="context"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.context}
              onChange={handleChange}
            >
              {contextOptions.map((context) => (
                <option key={context} value={context}>
                  {context}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="user_context" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Context
          </label>
          <div className="mt-1">
            <textarea
              id="user_context"
              name="user_context"
              rows={3}
              className="block w-full px-3 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm hover:border-gray-400 transition-colors resize-none"
              placeholder="Enter specific patient demographics, comorbidities, or clinical considerations for your case study..."
              value={formData.user_context}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<PlayArrowIcon />}
            disabled={loading}
            sx={{ 
              textTransform: 'none', 
              py: 1.5,
              fontWeight: 'medium'
            }}
          >
            Generate Nursing Case
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NursingForm;
