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
