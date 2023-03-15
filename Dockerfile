FROM python:3.8.10-slim-buster

# set the working directory
WORKDIR /app

# copy the requirements file into the container
COPY requirements.txt .
RUN apt-get update && apt-get install -y locales
RUN pip install --trusted-host pypi.python.org wheel
RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN echo 'vi_VN UTF-8' >> /etc/locale.gen && locale-gen vi_VN

# copy the rest of the application code
COPY . .

ENV FLASK_APP manage.py
ENV FLASK_RUN_PORT 5000

EXPOSE 5000

ENV FLASK_RUN_HOST 0.0.0.0
CMD flask run