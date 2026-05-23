# backend/Dockerfile

# Use an official, lightweight Python image
FROM python:3.10-slim

# Set environment variables
# 1. Prevents Python from writing .pyc files to disc
# 2. Prevents Python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for MySQL client
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        default-libmysqlclient-dev \
        pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the Django project files
COPY . .

# The command to run the server is already specified in docker-compose.yml,
# but providing a default is good practice.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]