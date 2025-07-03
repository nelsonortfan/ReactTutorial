echo "# ReactTutorial" >> README.md

git init

git add README.md

git commit -m "first commit"

git branch -M main

git remote add origin https://github.com/nelsonortfan/ReactTutorial.git

git push -u origin main

Si presenta problemas por el archivo Readme la primera vez hacer esto:

git pull origin main --allow-unrelated-histories

cerrar con :q! y luego ejecutar:

git push origin main
