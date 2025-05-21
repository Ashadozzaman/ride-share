## Docker Compose

Docker compose basic command

```
docker compose ps
docker compose --build -d
docker compose -d
docker compose down

docker exec -it laravel-php bash // enter container
```

## Can use your local MySQL credentials ?

Yes, absolutely — you **can use your local MySQL credentials** and **ignore the MySQL Docker container**, especially if your database is running outside of Docker (locally or on a remote server like your production service).

---

### ✅ Steps to Use Local MySQL Instead of Docker MySQL:

#### 1. **Update `.env` file** to match your local MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=host.docker.internal
DB_PORT=3306
DB_DATABASE=ride_share
DB_USERNAME=root
DB_PASSWORD=Start@123
```

-   ✅ `host.docker.internal` allows Docker containers to talk to your host machine’s services (like MySQL).
-   ❗️Don't use `127.0.0.1` or `localhost` from inside Docker — it refers to the container itself.

---

#### 2. **Comment or remove the `mysql` service** in your `docker-compose.yml`:

```yaml
# mysql:
#     image: mysql:8.0
#     container_name: laravel-mysql
#     ports:
#         - "3307:3307"
#     ...
```

Or just remove `depends_on: - mysql` from the PHP container if it's no longer relevant.

---

#### 3. **Rebuild the containers** without MySQL:

```bash
docker-compose up -d --build
```

---

#### 4. ✅ **Test connection** from your Laravel container:

```bash
docker exec -it laravel-php bash
# Inside container:
php artisan migrate
```

If configured correctly, Laravel should now connect to your **local MySQL** using the provided credentials.

---

### 🔐 Extra Tip for Production

In production, you can override `.env` with production database credentials:

```env
DB_HOST=production-db-host
DB_PORT=3306
DB_DATABASE=prod_db
DB_USERNAME=prod_user
DB_PASSWORD=prod_pass
```

---

Let me know if you're using a `.env.docker` or have multiple environments — I can help structure that cleanly too!

## Error Solve

### That error means your Laravel container

**cannot resolve** `host.docker.internal` — which is common on **Linux** systems because `host.docker.internal` only works out of the box on **Docker for Mac/Windows**, but **not on native Docker for Linux**.

---

### ✅ Solutions for Linux (since you're on Ubuntu):

#### ✅ Option 1: Use your **host machine's IP address** instead of `host.docker.internal`

1. Run this on your host machine to get your local IP:

    ```bash
    ip addr show docker0
    ```

    or:

    ```bash
    ip route | grep default
    ```

    Look for something like `inet 192.168.x.x`.

2. Then in your `.env`, use that IP:

    ```env
    DB_HOST=192.168.x.x
    DB_PORT=3306
    DB_DATABASE=ride_share
    DB_USERNAME=root
    DB_PASSWORD=Start@123
    ```

3. ✅ Make sure MySQL is **listening on `0.0.0.0`**, not just `127.0.0.1`. You can check this in `/etc/mysql/mysql.conf.d/mysqld.cnf`:

    ```ini
    bind-address = 0.0.0.0
    ```

4. Then restart MySQL:

    ```bash
    sudo service mysql restart
    ```

---

#### ✅ Option 2: Add an extra network alias in Docker

If you want to simulate `host.docker.internal`, you can do this in `docker-compose.yml` under `php`:

```yaml
php:
  ...
  extra_hosts:
    - "host.docker.internal:host-gateway"
```

> This trick tells Docker to map `host.docker.internal` to the **host's actual IP** via Docker’s `host-gateway`.

Then you can **keep using**:

```env
DB_HOST=host.docker.internal
```

---

### 🔁 Restart Services

After changing `.env` or `docker-compose.yml`, don’t forget to:

```bash
docker-compose down
docker-compose up -d --build
```

---

Let me know which option you want to go with, and I can guide you through!
