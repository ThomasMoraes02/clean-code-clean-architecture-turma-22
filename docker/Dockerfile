# Use a imagem oficial do Node.js
# A versão 22-slim é uma imagem leve baseada no Debian, adequada para a maioria dos aplicativos Node.js
# docker build -t cccat22_backend docker
# O comando acima irá construir a imagem Docker usando este Dockerfile e nomeá-la como "cccat22_backend"
# Depois de construir a imagem, você pode rodar um container usando o comando:
# docker run -it cccat22_backend bash 
FROM node:22-slim

# Instala as dependências necessárias para o projeto
RUN apt-get update && apt-get install -y \
    curl

# Define o diretório de trabalho dentro do container
WORKDIR /app