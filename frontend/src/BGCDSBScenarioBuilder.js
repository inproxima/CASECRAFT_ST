import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  Radio,
  RadioGroup,
  Paper,
  Typography,
  Box,
  Chip,
  Tooltip,
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { marked } from 'marked';
import HTMLtoDOCX from 'html-docx-js/dist/html-docx';

const BGCDSBScenarioBuilder = () => {
  const [scenario, setScenario] = useState({
    title: '',
    type: 'Instructional',
    context: '',
    dilemma: '',
    fasterAlignment: {
      fairness: false,
      accountability: false,
      security: false,
      transparency: false,
      explainability: false,
      responsibility: false
    },
    redLine: '',
    questions: [
      { id: 1, text: '', category: 'Ethical Framing' },
      { id: 2, text: '', category: 'FASTER Principle Reflection' },
      { id: 3, text: '', category: 'AI Use Decision' },
      { id: 4, text: '', category: 'Red Line Clarification' },
      { id: 5, text: '', category: 'Action Planning' }
    ]
  });

  const [showGeneratedScenario, setShowGeneratedScenario] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const scenarioTypes = ['Instructional', 'Administrative', 'Student Well-being', 'Other'];

  const questionTemplates = {
    'Ethical Framing': 'What ethical concerns does this scenario raise in the context of Catholic values and student dignity?',
    'FASTER Principle Reflection': 'Which FASTER principles apply here, and how would you explain your decision to a parent, student, or colleague?',
    'AI Use Decision': 'Should GenAI be used in this situation? If yes, when and how? If not, why not?',
    'Red Line Clarification': 'Does this scenario reveal a need for a new red line or clearer policy at BGCDSB?',
    'Action Planning': 'What guidelines, supports, or training would staff need to handle this situation responsibly?'
  };

  const handleInputChange = (field, value) => {
    setScenario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFasterChange = (principle) => {
    setScenario(prev => ({
      ...prev,
      fasterAlignment: {
        ...prev.fasterAlignment,
        [principle]: !prev.fasterAlignment[principle]
      }
    }));
  };

  const handleQuestionChange = (id, text) => {
    setScenario(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, text } : q
      )
    }));
  };

  const autofillQuestion = (id) => {
    const question = scenario.questions.find(q => q.id === id);
    if (question && questionTemplates[question.category]) {
      handleQuestionChange(id, questionTemplates[question.category]);
    }
  };

  const generateScenarioDocument = () => {
    const fasterPrinciples = Object.entries(scenario.fasterAlignment)
      .filter(([_, value]) => value)
      .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(', ');

    const content = `
# ${scenario.title || 'Untitled Scenario'}

## Scenario Type
**${scenario.type}**

## Context
${scenario.context || 'No context provided'}

## The Dilemma
${scenario.dilemma || 'No dilemma described'}

## FASTER Principles Alignment
**Principles Involved:** ${fasterPrinciples || 'None selected'}

## Red Line Assessment
**Crosses a red line?** ${scenario.redLine || 'Not specified'}

## Discussion Questions

${scenario.questions
  .filter(q => q.text)
  .map((q, index) => `### ${index + 1}. ${q.category}
${q.text}`)
  .join('\n\n')}

---

*This scenario was created using the BGCDSB Scenario Builder to support responsible AI integration in Catholic education.*

**BGCDSB Values Reminder:** All educational practices—whether human-led or AI-assisted—must align with our commitment to the dignity of the learner, equity of access, and the sacred trust placed in Catholic educators to form both minds and hearts.
`;

    setGeneratedContent(content);
    setShowGeneratedScenario(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const downloadDOCX = () => {
    const html = marked.parse(generatedContent);
    const blob = HTMLtoDOCX.asBlob(`<!doctype html><html><head><meta charset="utf-8" /></head><body>${html}</body></html>`);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bgcdsb-scenario-${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Scenario Builder: Bruce-Grey Catholic District School Board
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Build discussion-worthy scenarios for responsible AI integration in Catholic education
                </p>
              </div>
              <Tooltip title="BGCDSB Values">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Input */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                1. Scenario Title
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Give your scenario a short, descriptive title"
                value={scenario.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                helperText="Example: 'Using AI for IEP Documentation'"
              />
            </Paper>

            {/* Scenario Type */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                2. Scenario Type
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Type</InputLabel>
                <Select
                  value={scenario.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  label="Select Type"
                >
                  {scenarioTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>

            {/* Context Builder */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                3. Scenario Context
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Describe the setting (e.g., grade level, subject, school event, policy meeting, etc.) and who is involved."
                value={scenario.context}
                onChange={(e) => handleInputChange('context', e.target.value)}
                helperText="Be specific about the Catholic school context and stakeholders"
              />
            </Paper>

            {/* Dilemma Description */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                4. The Dilemma
              </Typography>
              <Alert severity="info" className="mb-4">
                <strong>Scaffold:</strong> In this scenario, a teacher/administrator/staff member is considering using [GenAI Tool] to [task]...
              </Alert>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="What decision needs to be made? What tension, risk, or opportunity does AI introduce?"
                value={scenario.dilemma}
                onChange={(e) => handleInputChange('dilemma', e.target.value)}
              />
            </Paper>

            {/* FASTER Alignment */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                5. FASTER Principles Alignment
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Which principles are supported or challenged in this scenario?
              </Typography>
              <FormGroup>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {Object.keys(scenario.fasterAlignment).map(principle => (
                    <FormControlLabel
                      key={principle}
                      control={
                        <Checkbox
                          checked={scenario.fasterAlignment[principle]}
                          onChange={() => handleFasterChange(principle)}
                        />
                      }
                      label={
                        <div>
                          <span className="font-medium">
                            {principle.charAt(0).toUpperCase() + principle.slice(1)}
                          </span>
                          {principle === 'fairness' && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Fair treatment for all students
                            </Typography>
                          )}
                          {principle === 'accountability' && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Clear responsibility and oversight
                            </Typography>
                          )}
                          {principle === 'security' && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Data protection and privacy
                            </Typography>
                          )}
                          {principle === 'transparency' && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Open about AI use and decisions
                            </Typography>
                          )}
                          {principle === 'explainability' && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Can explain AI outputs
                            </Typography>
                          )}
                          {principle === 'responsibility' && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Ethical and responsible use
                            </Typography>
                          )}
                        </div>
                      }
                    />
                  ))}
                </div>
              </FormGroup>
            </Paper>

            {/* Red Line Detector */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                6. Red Line Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Does this scenario cross a red line for BGCDSB?
              </Typography>
              <RadioGroup
                value={scenario.redLine}
                onChange={(e) => handleInputChange('redLine', e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes - Crosses a red line" />
                <FormControlLabel value="No" control={<Radio />} label="No - Within acceptable use" />
                <FormControlLabel value="Unclear" control={<Radio />} label="Unclear - Needs discussion" />
              </RadioGroup>
              <Typography variant="caption" color="text.secondary" className="mt-2 block">
                Red lines include: replacing human care, compromising sacramental values, data misuse, unapproved content
              </Typography>
            </Paper>

            {/* Discussion Questions */}
            <Paper elevation={1} className="p-6">
              <Typography variant="h6" gutterBottom>
                7. Discussion Questions
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Customize or auto-fill these guiding questions
              </Typography>
              <div className="space-y-4 mt-4">
                {scenario.questions.map((question) => (
                  <div key={question.id}>
                    <div className="flex items-center justify-between mb-2">
                      <Chip 
                        label={question.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                      <Button
                        size="small"
                        startIcon={<AutoAwesomeIcon />}
                        onClick={() => autofillQuestion(question.id)}
                      >
                        Auto-fill
                      </Button>
                    </div>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                      placeholder={questionTemplates[question.category]}
                    />
                  </div>
                ))}
              </div>
            </Paper>

            {/* Generate Button */}
            <Box className="flex justify-center">
              <Button
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                onClick={generateScenarioDocument}
                sx={{ px: 6, py: 2 }}
              >
                Generate Scenario Document
              </Button>
            </Box>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Paper elevation={2} className="p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <InfoIcon color="primary" className="mr-2" />
                <Typography variant="h6">BGCDSB Values Reminder</Typography>
              </div>
              <Divider className="mb-4" />
              <Typography variant="body2" color="text.secondary">
                At BGCDSB, all educational practices—whether human-led or AI-assisted—must align with our commitment to:
              </Typography>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✝</span>
                  <Typography variant="body2">The dignity of the learner</Typography>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✝</span>
                  <Typography variant="body2">Equity of access</Typography>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✝</span>
                  <Typography variant="body2">The sacred trust placed in Catholic educators to form both minds and hearts</Typography>
                </li>
              </ul>

              <Divider className="my-4" />
              
              <Typography variant="subtitle2" gutterBottom>
                FASTER Principles Guide
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Use these principles to evaluate AI integration:
              </Typography>
              <div className="mt-2 space-y-1">
                <Typography variant="caption" display="block">
                  <strong>F</strong>air • <strong>A</strong>ccountable • <strong>S</strong>ecure
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>T</strong>ransparent • <strong>E</strong>xplainable • <strong>R</strong>esponsible
                </Typography>
              </div>
            </Paper>
          </div>
        </div>

        {/* Generated Scenario Display */}
        {showGeneratedScenario && (
          <Paper elevation={2} className="mt-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h5">Generated Scenario</Typography>
              <div className="space-x-2">
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={downloadDOCX}
                >
                  Download DOCX
                </Button>
              </div>
            </div>
            <Divider className="mb-4" />
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {generatedContent}
              </pre>
            </div>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default BGCDSBScenarioBuilder;
