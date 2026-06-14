"""
Crée les bases Notion manquantes pour le site Alliance Digitale.
Usage : python3 scripts/create_notion_databases.py
"""
import os
from notion_client import Client

TOKEN = os.environ.get("NOTION_TOKEN")
PAGE_ID = "37f9628038de80b98601edced25e27f8"  # Page parente / équipe Site Alliance Digitale

def create_case_studies_db(notion: Client, parent_id: str):
    return notion.databases.create(
        parent={"type": "page_id", "page_id": parent_id},
        title=[{"type": "text", "text": {"content": "Études de cas Alliance Digitale"}}],
        properties={
            "Titre": {"title": {}},
            "Slug": {"rich_text": {}},
            "Client": {"rich_text": {}},
            "Anonymisé": {"checkbox": {}},
            "Secteur": {"rich_text": {}},
            "Problème": {"rich_text": {}},
            "Solution": {"rich_text": {}},
            "Résultat chiffré": {"rich_text": {}},
            "Visuel": {"url": {}},
            "Vidéo preuve": {"url": {}},
            "Publié": {"checkbox": {}},
        },
    )

def create_resources_db(notion: Client, parent_id: str):
    return notion.databases.create(
        parent={"type": "page_id", "page_id": parent_id},
        title=[{"type": "text", "text": {"content": "Ressources Alliance Digitale"}}],
        properties={
            "Titre": {"title": {}},
            "Slug": {"rich_text": {}},
            "Description": {"rich_text": {}},
            "Publié": {"checkbox": {}},
        },
    )

def main():
    if not TOKEN:
        print("ERREUR : définissez la variable d'environnement NOTION_TOKEN")
        return
    notion = Client(auth=TOKEN)
    print("Création de la base 'Études de cas Alliance Digitale'...")
    case_studies = create_case_studies_db(notion, PAGE_ID)
    print(f"ID : {case_studies['id']}")
    print("Création de la base 'Ressources Alliance Digitale'...")
    resources = create_resources_db(notion, PAGE_ID)
    print(f"ID : {resources['id']}")
    print("\nAjoutez ces IDs dans votre fichier .env :")
    print(f"NOTION_CASE_STUDIES_DB_ID={case_studies['id']}")
    print(f"NOTION_RESOURCES_DB_ID={resources['id']}")

if __name__ == "__main__":
    main()
