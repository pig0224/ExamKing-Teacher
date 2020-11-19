FROM nginx:alpine

# 镜像信息
LABEL author="pig224" email="xiaomo_0258@icloud.com"

WORKDIR /var/log/nginx
COPY ./ ./

WORKDIR /etc/nginx/conf.d/
COPY ./ ./

WORKDIR /etc/nginx/
COPY ./nginx.conf ./nginx.conf