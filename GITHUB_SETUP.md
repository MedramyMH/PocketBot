# Загрузка проекта на GitHub

## 🔧 Предварительная подготовка

### 1. Настройте Git (если еще не сделано)
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

### 2. Создайте SSH ключ (рекомендуется)
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Нажмите Enter для всех вопросов
```

Скопируйте публичный ключ:
```bash
cat ~/.ssh/id_ed25519.pub
```

Добавьте ключ в GitHub:
1. Перейдите на https://github.com/settings/keys
2. Нажмите "New SSH key"
3. Вставьте содержимое из команды выше
4. Сохраните

## 📤 Загрузка проекта

### Вариант 1: Использование SSH (рекомендуется)

```bash
# Перейдите в папку проекта
cd /home/runner/workspace

# Инициализируйте репозиторий (если еще не инициализирован)
git init

# Добавьте remote
git remote add origin git@github.com:manuninkirill-bot/pocketoption.git

# Проверьте remote
git remote -v

# Добавьте все файлы
git add .

# Создайте коммит
git commit -m "Initial commit: PocketOption Trading Bot Dashboard

- SAR Multi-Timeframe Confluence Strategy
- Python microservice for PocketOption API
- React dashboard with Bloomberg Terminal design
- WebSocket real-time updates
- Support for 85+ trading assets"

# Отправьте на GitHub
git branch -M main
git push -u origin main
```

### Вариант 2: Использование HTTPS

Если SSH не работает, используйте HTTPS с Personal Access Token:

```bash
cd /home/runner/workspace

# Инициализируйте репозиторий (если еще не инициализирован)
git init

# Добавьте remote
git remote add origin https://github.com/manuninkirill-bot/pocketoption.git

# Проверьте remote
git remote -v

# Добавьте все файлы
git add .

# Создайте коммит
git commit -m "Initial commit: PocketOption Trading Bot Dashboard"

# Отправьте на GitHub
git branch -M main
git push -u origin main

# При запросе:
# Username: manuninkirill-bot
# Password: ваш Personal Access Token
```

#### Как создать Personal Access Token:
1. Откройте https://github.com/settings/tokens
2. Нажмите "Generate new token" → "Generate new token (classic)"
3. Дайте ему имя (например, "pocketoption-bot")
4. Выберите scopes: `repo` (весь доступ к репозиториям)
5. Нажмите "Generate token"
6. **Скопируйте токен сразу** (после обновления страницы его не будет видно)

## ✅ Проверка

Убедитесь, что файлы загружены:

```bash
# Посмотрите статус
git status

# Посмотрите логи
git log --oneline

# Убедитесь, что все отправлено
git push --all
```

Проверьте на GitHub:
- https://github.com/manuninkirill-bot/pocketoption

## 🔄 Синхронизация (для будущих обновлений)

Когда захотите обновить репозиторий:

```bash
# Добавьте все изменения
git add .

# Создайте коммит
git commit -m "Update: описание изменений"

# Отправьте на GitHub
git push
```

## 🚀 Клонирование на другую машину

```bash
# Клонируйте проект
git clone git@github.com:manuninkirill-bot/pocketoption.git
cd pocketoption

# Установите зависимости
npm install

# Запустите проект
npm run dev
```

## 🆘 Проблемы

### "Permission denied (publickey)"
- Проверьте SSH ключ: `ssh -T git@github.com`
- Пересоздайте SSH ключ и добавьте его в GitHub

### "fatal: The current branch main has no upstream branch"
```bash
git branch -u origin/main
```

### "Your branch is ahead of 'origin/main'"
```bash
git push origin main
```

### Ошибка при push
```bash
# Сначала получите обновления
git pull origin main

# Затем отправьте
git push origin main
```

## 📝 Рекомендуемые коммиты

```bash
# После изменений в SAR алгоритме
git commit -m "Improve: Оптимизация SAR калькулятора для 85+ активов"

# После добавления функции
git commit -m "Feature: Добавлена поддержка live trading"

# После исправления бага
git commit -m "Fix: Исправлена проблема с WebSocket reconnect"

# После обновления документации
git commit -m "Docs: Обновлена README с инструкциями"
```

---

**Вопросы?** Смотрите [GitHub Documentation](https://docs.github.com)
