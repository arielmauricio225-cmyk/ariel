from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/menu")
def menu():
    return render_template("menu.html")


@app.route("/promociones")
def promociones():
    return render_template("promociones.html")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)