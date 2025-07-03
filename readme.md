# Enlace de Ingreso

Es posible acceder al proyecto ya desplegado ingresando a: https://cocomo-project.vercel.app/

## 🚀 Cómo Empezar (Para Principiantes)

Esta guía te llevará paso a paso para ejecutar este proyecto, incluso si nunca antes has instalado Node.js, pnpm o trabajado con un proyecto Next.js.

### 🛠️ Paso 0: Herramientas Necesarias (Instalación Única)

Si ya tienes estas herramientas, puedes saltar a la sección "⚙️ Configuración del Proyecto".

1.  **Instalar un Editor de Código (Recomendado):**
    *   Te recomendamos **Visual Studio Code (VS Code)**. Es gratuito y muy popular.
    *   Descárgalo desde: [https://code.visualstudio.com/](https://code.visualstudio.com/)
    *   Sigue las instrucciones de instalación para tu sistema operativo.

2.  **Instalar Node.js y npm:**
    *   Node.js es el entorno de ejecución para JavaScript, y `npm` es su gestor de paquetes (que usaremos para instalar `pnpm`).
    *   Ve a [https://nodejs.org/](https://nodejs.org/).
    *   Descarga la versión **LTS** (Long-Term Support), ya que es la más estable.
    *   Ejecuta el instalador y sigue las instrucciones por defecto.
    *   **Verificación:** Abre una terminal o Símbolo del sistema:
        *   Windows: Busca "Símbolo del sistema" o "PowerShell".
        *   macOS/Linux: Abre "Terminal".
        *   Escribe `node -v` y presiona Enter. Deberías ver una versión (ej: `v18.17.0`).
        *   Escribe `npm -v` y presiona Enter. Deberías ver una versión (ej: `v9.6.7`).

3.  **Instalar `pnpm`:**
    *   `pnpm` es un gestor de paquetes rápido y eficiente en el uso de espacio en disco, que este proyecto utiliza.
    *   En la misma terminal que abriste antes, ejecuta:
        ```bash
        npm install -g pnpm
        ```
    *   **Verificación:** Cierra y vuelve a abrir tu terminal (a veces es necesario). Luego ejecuta:
        ```bash
        pnpm -v
        ```
        Deberías ver una versión de `pnpm` (ej: `8.6.12`).

4.  **Instalar Git (Opcional, pero Muy Recomendado):**
    *   Git es un sistema de control de versiones. Lo necesitarás si quieres clonar este proyecto desde un repositorio (como GitHub). Si ya tienes los archivos del proyecto (ej: de un ZIP), puedes omitir este paso por ahora.
    *   Descárgalo desde: [https://git-scm.com/downloads](https://git-scm.com/downloads)
    *   Sigue las instrucciones de instalación.

---

### ⚙️ Configuración del Proyecto

1.  **Obtener el Código del Proyecto:**

    *   **Opción A: Clonar con Git (Recomendado)**
        En tu terminal, navega a la carpeta donde quieres guardar el proyecto (ej: `cd Documents`) y ejecuta:
        ```bash
        git clone https://github.com/Linkinhh/cocomo-estimator.git
        ```

    *   **Opción B: Descargar los Archivos**
        Si tienes un archivo ZIP con el proyecto, descomprímelo en la ubicación que prefieras.

2.  **Navegar a la Carpeta del Proyecto:**
    En tu terminal, usa el comando `cd` para entrar en la carpeta del proyecto que acabas de clonar o descomprimir.
    ```bash
    cd <NOMBRE_DE_LA_CARPETA_DEL_PROYECTO>
    ```
    (Reemplaza `<NOMBRE_DE_LA_CARPETA_DEL_PROYECTO>` con el nombre real de la carpeta).

3.  **Instalar Dependencias:**
    Una vez dentro de la carpeta raíz del proyecto, instala todas las librerías necesarias con `pnpm`:
    ```bash
    pnpm install
    ```
    Esto leerá el archivo `package.json` y descargará todo lo que el proyecto necesita para funcionar.

---

### ▶️ Ejecutar el Proyecto

1.  **Iniciar el Servidor de Desarrollo:**
    Para ver el proyecto en tu navegador y que se actualice automáticamente cuando hagas cambios en el código, ejecuta:
    ```bash
    pnpm dev
    ```
2.  **Abrir en el Navegador:**
    La terminal te indicará que el servidor está listo y en qué dirección puedes acceder. Usualmente será:
    [http://localhost:3000](http://localhost:3000)

    Abre esta URL en tu navegador web (Chrome, Firefox, Edge, etc.).

3.  **Detener el Servidor:**
    Para detener el servidor de desarrollo, vuelve a la terminal donde ejecutaste `pnpm dev` y presiona `Ctrl + C`.

---

¡Eso es todo! Ahora puedes empezar a explorar y modificar el proyecto. ¡Feliz codificación!