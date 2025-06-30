# Use official AWS Lambda Node.js image
FROM public.ecr.aws/lambda/nodejs:18

# SUPPRIMER cette ligne - nous n'en avons pas besoin avec l'image Lambda
# WORKDIR /app

# Copier package.json au bon endroit - ${LAMBDA_TASK_ROOT} est la variable correcte
COPY package*.json ${LAMBDA_TASK_ROOT}/

# Installer les dépendances dans le répertoire du Lambda
RUN cd ${LAMBDA_TASK_ROOT} && npm install --production

# Copier tous les fichiers au bon endroit
COPY . ${LAMBDA_TASK_ROOT}/

# Exposer le port utilisé par le runtime Lambda
EXPOSE 8080

# Point d'entrée pour la fonction Lambda
CMD ["src/handlers/app.transactionalEmailHandler"]