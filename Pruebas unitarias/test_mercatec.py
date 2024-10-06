import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from usuarios import users  # Importar la lista de usuarios desde usuarios.py

class MercaTECTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Iniciar el navegador
        cls.service = EdgeService(EdgeChromiumDriverManager().install())
        cls.driver = webdriver.Edge(service=cls.service)
        cls.driver.implicitly_wait(10)

    def login(self, email, password):
        """Función para realizar el login"""
        # Navegar a la página de inicio de sesión
        self.driver.get("http://127.0.0.1:5500/MercaTEC/Iniciar%20sesion.html")

        # Introducir credenciales
        username_field = self.driver.find_element(By.ID, "edCorreo")
        password_field = self.driver.find_element(By.ID, "edContrasenna")
        login_button = self.driver.find_element(By.ID, "btnIniciarSesion")

        # Enviar las credenciales
        username_field.send_keys(email)
        password_field.send_keys(password)
        login_button.click()

    def logout(self):
        """Función para cerrar sesión"""
        # Esperar hasta que el botón de cerrar sesión esté disponible y visible
        logout_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "btnSalir"))
        )
        logout_button.click()

        # Validar que se ha regresado a la página de inicio de sesión
        login_page_title = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        self.assertEqual(login_page_title.text, "MercaTEC")

    def test_multiple_users(self):
        """Prueba el inicio de sesión y cierre de sesión con múltiples usuarios"""
        
        # Iterar sobre cada usuario importado desde usuarios.py
        for user in users:
            # Realizar el login con las credenciales del usuario actual
            self.login(user["email"], user["password"])

            # Verificar si el login fue exitoso o fallido
            try:
                # Si el login es exitoso, se debe redirigir a la página principal
                dashboard_title = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.ID, "title"))
                )
                print(f"Usuario {user['email']} ha iniciado sesión correctamente.")
                self.assertEqual(dashboard_title.text, "")  # MercaTEC

                # Cerrar sesión
                self.logout()

            except Exception as e:
                # Si no se pudo iniciar sesión, validar si aparece el mensaje de error
                error_message = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.ID, "lblAlerta"))
                )
                print(f"Fallo al iniciar sesión con el usuario {user['email']}.")
                self.assertTrue(error_message.is_displayed())

    @classmethod
    def tearDownClass(cls):
        # Cerrar el navegador al final
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()
