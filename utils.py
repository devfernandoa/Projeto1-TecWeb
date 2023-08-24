from pathlib import Path
CUR_DIR = Path(__file__).parent

def extract_route(route):
    "Separa a primeira linha da requisicao"
    # firstLine = route.split('\n')[0]
    # return "/".join(firstLine.split('/')[1:]).split(" ")[0]
    return route.split()[1][1:] if len(route.split()) > 1 else ""

def read_file(path):
    "Le o arquivo e retorna seu conteudo"
    try:
        file = open(path, 'rb')
        content = file.read()
        file.close()
        return content
    except:
        return None
    
import json
def load_data(JsonFile):
    "Carrega os dados do arquivo json"
    try:
        path = CUR_DIR / "data"
        file = open(path / JsonFile, 'r')
        data = json.load(file)
        file.close()
        return data
    except:
        return None

def update_data(JsonFile, data):
    "Atualiza os dados do arquivo json"
    try:
        path = CUR_DIR / "data"

        file = open(path / JsonFile, 'r', encoding='utf-8')
        old_data = json.load(file)
        file.close()

        file = open(path / JsonFile, 'w')
        old_data.append({"titulo": f"{data[0]}","detalhes": f"{data[1]}"},)
        json.dump(old_data, file)
        file.close()

        return True
    except:
        print("FUDEUUUUUUUUU 2")
        return False


def load_template(Template):
    "Carrega os dados do arquivo html"
    try:
        path = CUR_DIR / "templates"
        file = open(path / Template, 'r', encoding='utf-8')
        data = file.read()
        file.close()
        return data
    except:
        print("FUDEUUUUUUUU")
        return None
    
def build_response(body='', code=200, reason='OK', headers=''):
    "Retorna a resposta do servidor"
    if headers == '':
        headers = "Content-Type: text/html; charset=utf-8"
    return (f"HTTP/1.1 {code} {reason}\n{headers}\n\n{body}").encode()
    