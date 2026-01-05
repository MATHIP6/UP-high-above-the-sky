FROM python:3.10

ENV PYTHONUNBUFFERED=1

WORKDIR /app/

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./src /app/src

COPY . /app

CMD ["fastapi", "run", "src/main.py"]
