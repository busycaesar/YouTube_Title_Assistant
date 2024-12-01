# Stage 1: Install required dependencies.
FROM python:3.9-slim AS dependencies

WORKDIR /app

COPY req.txt /app

RUN pip install -r req.txt

# Stage 2: Move the src directory and start the server.
FROM python:3.9-slim

WORKDIR /app

COPY --from=dependencies /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

COPY src/ /app/

EXPOSE ${PORT}

CMD python app.py

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
        CMD curl --fail localhost:${PORT} || exit 1