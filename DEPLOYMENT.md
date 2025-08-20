# Deployment Guide for Render

This guide walks you through deploying CaseCraft to Render.com.

## Prerequisites

1. A Render.com account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, etc.)
3. An OpenAI API key

## Step-by-Step Deployment

### 1. Connect Your Repository

1. Log in to [Render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your Git repository containing the CaseCraft code
4. Select the repository and branch to deploy

### 2. Configure the Service

Render will automatically detect the `render.yaml` file and configure most settings. Verify these settings:

- **Name**: `casecraft` (or your preferred name)
- **Environment**: `Python`
- **Build Command**: `./build.sh`
- **Start Command**: `python server.py`
- **Plan**: Free (or upgrade as needed)

### 3. Set Environment Variables

In the Render dashboard, go to your service settings and add:

- **Key**: `OPENAI_API_KEY`
- **Value**: Your actual OpenAI API key
- Keep "Secret" checked to protect your API key

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically start building and deploying your application
3. The build process will:
   - Install Python dependencies
   - Install Node.js dependencies
   - Build the React frontend
   - Start the Flask server

### 5. Access Your Application

Once deployment is complete, Render will provide you with a URL like:
`https://casecraft-xxxx.onrender.com`

## Monitoring and Maintenance

### Logs
- View real-time logs in the Render dashboard
- Monitor for any errors or issues

### Updates
- Push changes to your connected Git branch
- Render will automatically redeploy your application

### Environment Variables
- Update environment variables in the Render dashboard
- Changes will trigger a redeploy

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are listed in `requirements.txt` and `package.json`
   - Ensure `build.sh` is executable (`chmod +x build.sh`)

2. **OpenAI API Errors**
   - Verify your API key is set correctly in environment variables
   - Check your OpenAI account has sufficient credits

3. **Frontend Not Loading**
   - Ensure the React build completed successfully
   - Check that the Flask app is serving static files correctly

### Support

- Check Render documentation: https://render.com/docs
- View application logs in the Render dashboard
- Check the GitHub repository issues for common problems

## Cost Considerations

- **Free Tier**: Suitable for development and light usage
- **Paid Plans**: Consider upgrading for production use with higher traffic
- **OpenAI Costs**: Monitor your OpenAI usage to manage API costs

## Security Notes

- Never commit your actual API keys to the repository
- Use environment variables for all sensitive configuration
- Regularly rotate your API keys as a security best practice
