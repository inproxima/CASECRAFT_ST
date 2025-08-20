# CaseCraft

CaseCraft is an AI-powered case scenario generator designed for educational purposes across multiple professional domains. It creates detailed, thought-provoking case studies for education, social work, nursing, and business training programs.

## Features

- **Multi-Domain Support**: Generate case scenarios for Education, Social Work, Nursing, and Business
- **AI-Powered**: Leverages OpenAI's GPT-4 to create realistic, complex scenarios
- **Canadian Context**: All scenarios are tailored for Canadian practice and educational standards
- **Interactive Web Interface**: Modern React-based frontend with intuitive form controls
- **Customizable Parameters**: Specify settings, categories, focus areas, and additional context
- **Real-time Generation**: Fast, responsive case generation with loading indicators

## Architecture

- **Frontend**: React.js application with Tailwind CSS for styling
- **Backend**: Flask API server with OpenAI integration
- **AI Model**: GPT-4 for intelligent case scenario generation

## Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd casecraft_st
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Create environment variables file
cp .env.example .env

# Add your OpenAI API key to .env
echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Build the React application
npm run build

# Return to project root
cd ..
```

## Usage

### Development Mode

1. **Start the Backend Server**:
```bash
python server.py
```
The Flask server will run on `http://localhost:8000`

2. **Start the Frontend Development Server** (optional, for development):
```bash
cd frontend
npm start
```
The React development server will run on `http://localhost:3000`

### Production Mode

```bash
python server.py
```
Visit `http://localhost:8000` to access the application.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## API Endpoints

### POST /generate

Generates a case scenario based on provided parameters.

**Request Body:**
```json
{
  "setting": "K-12",
  "case_category": "Classroom Management",
  "options": "Student Behavior",
  "context": "Urban elementary school",
  "user_context": "Additional context (optional)",
  "generator_type": "education"
}
```

**Response:**
```json
"Generated case scenario text..."
```

## Case Types

### Education
- **K-12**: Elementary and secondary education scenarios
- **Higher Education**: University and college contexts
- **Adult Professional Learning**: Corporate and professional development

### Social Work
- Comprehensive scenarios covering Canadian social work practice
- Ethical dilemmas and multi-system considerations
- Cultural competency and social justice focus

### Nursing
- Clinical scenarios for Canadian healthcare practice
- Patient safety and evidence-based practice
- Interprofessional collaboration and ethical considerations

### Business (Coming Soon)
- Corporate case studies and business scenarios

## Deployment

### Render Deployment

This application is configured for easy deployment on Render.com.

1. **Connect your repository** to Render
2. **Set environment variables** in Render dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
3. **Deploy** using the provided `render.yaml` configuration

The application will automatically:
- Install Python dependencies
- Build the React frontend
- Start the Flask server

### Manual Deployment

For other platforms, ensure you:
1. Install all dependencies from `requirements.txt`
2. Build the React frontend with `npm run build`
3. Set the `OPENAI_API_KEY` environment variable
4. Start the Flask server with `python server.py`

## Project Structure

```
casecraft_st/
├── server.py              # Flask backend server
├── service_shared.py      # OpenAI client configuration
├── constants.py           # Application constants
├── requirements.txt       # Python dependencies
├── render.yaml           # Render deployment configuration
├── .env.example          # Environment variables template
├── build.sh              # Production build script
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── App.js        # Main application component
│   │   ├── api.js        # API client configuration
│   │   ├── CaseForm.js   # Education case form
│   │   ├── SocialWorkForm.js  # Social work case form
│   │   ├── NursingForm.js     # Nursing case form
│   │   └── CaseDisplay.js     # Case display component
│   ├── public/           # Static assets
│   └── package.json      # Node.js dependencies
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- React and Flask communities for excellent documentation
- Canadian educational and professional standards organizations for guidance on scenario development
