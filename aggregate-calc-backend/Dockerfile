FROM python:3.12-slim

LABEL version="1.1"

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN useradd appuser 

COPY . .

RUN chown -R appuser:appuser /backend

USER appuser

CMD ["uvicorn", "app.main:app", "--host=0.0.0.0"]
