def generate_hello_world(language):
    """
    Generate the dump program for the language.
    Hello world programd according to language
    """

    file = {
        "filename": "",
        "content": "",
    }

    if language == "python":
        content = """print("Hello World!")
        """
        file["filename"] = "main.py"
        file["content"] = content
    elif language == "javascript":
        content = """console.log("Hello World!")
        """
        file["filename"] = "main.js"
        file["content"] = content
    elif language == "cpp":
        content = """#include <iostream>
        using namespace std;
        int main() {
            cout << "Hello World!";
            return 0;
        }
        """
        file["filename"] = "main.cpp"
        file["content"] = content

    return file
