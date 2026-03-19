# 🛒 FrikiTrader - Marketplace de Coleccionismo

**FrikiTrader** es una plataforma Full Stack diseñada para entusiastas del coleccionismo (manga, figuras, merchandising). Permite a los usuarios gestionar su catálogo de productos con persistencia en la nube y una interfaz reactiva de última generación.

---

## 📂 Estructura del Proyecto

El repositorio se divide en tres grandes bloques desacoplados:

* **`/FrikiTrader-Backend`**: API RESTful construida con **.NET 8** siguiendo una arquitectura de 4 capas (Domain, Application, Infrastructure, API).
* **`/FrikiTrader-Web`**: Cliente Single Page Application (SPA) desarrollado con **Angular 18**, utilizando **Signals** para la gestión de estado.
* **`FrikiTrader-Backend/FrikiTrader-Database`**: Contiene el script de exportación de MySQL con la estructura y datos de prueba.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* **MySQL Server** (v8.0+)
* **.NET SDK 8.0**
* **Node.js** (v20.x o superior) e **npm**
* **Angular CLI** (`npm install -g @angular/cli`)

---

## 🚀 Instalación y Configuración

### 1. Base de Datos (MySQL)
Para visualizar el proyecto con los productos ya creados:
1. Cree una base de datos llamada `frikitraderbd`.
2. Importe el archivo `script_db_frikitrader.sql` ubicado en la carpeta `/FrikiTrader-Database`.
   * *Sugerencia: Use MySQL Workbench > Data Import > Import from Self-Contained File.*

### 2. Backend (.NET 8)
1. Navegue a la carpeta: `cd FrikiTrader-Backend`.
2. Abra el archivo `appsettings.json` en el proyecto **FrikiTrader.API** y ajuste su `ConnectionString` (usuario y contraseña de MySQL).
3. Restaure dependencias y ejecute:
   ```bash
   dotnet restore
   dotnet run --project FrikiTrader.API
4.La API estará disponible en https://localhost:7235 (o el puerto configurado). Puede consultar la documentación en /swagger.

### 3. Frontend (Angular 18)
1.Navegue a la carpeta: cd FrikiTrader-Web.
2. Instale las dependencias: npm install.
3.Inicie el servidor de desarrollo: ng serve.
4.Abra su navegador en http://localhost:4200.
5.Nota sobre Firebase: La aplicación está conectada a un entorno de Firebase Storage activo para la gestión de imágenes. No es necesaria configuración adicional para la demo.

### 4. 🧪 Tecnologías Utilizadas
Backend (.NET 8)
  Entity Framework Core
  ASP.NET Core Web API
  JWT Authentication

Frontend (Angular 18)
  Signals (State Management)
  Standalone Components
  Bootstrap 5.3 & SASS

Cloud & DB
  MySQL 8.0
  Firebase Storage
