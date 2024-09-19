import os
from pathlib import Path
from dotenv import load_dotenv


env_file_path = '.env'

load_dotenv(dotenv_path=env_file_path)

###################################################
DB_USER = os.getenv("POSTGRES_USER")              #
DB_PASS = os.getenv("POSTGRES_PASSWORD")          #
DB_NAME = os.getenv("POSTGRES_DB")                #
DB_PORT = os.getenv("POSTGRES_PORT")              #
DB_HOST = os.getenv("POSTGRES_HOST")              #
###################################################

SQLALCHEMY_DATABASE_URL = f'postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

#####################################################
DB_USER_TEST = os.getenv("POSTGRES_TEST_USER")      #
DB_PASS_TEST = os.getenv("POSTGRES_TEST_PASSWORD")  #
DB_NAME_TEST = os.getenv("POSTGRES_TEST_DB")        #
DB_PORT_TEST = os.getenv("POSTGRES_TEST_PORT")      #
DB_HOST_TEST = os.getenv("POSTGRES_TEST_HOST")      #
#####################################################

SQLALCHEMY_DATABASE_TEST_URL = f'postgresql+asyncpg://{DB_USER_TEST}:{DB_PASS_TEST}@{DB_HOST_TEST}:{DB_PORT_TEST}/{DB_NAME_TEST}'


BASE_DIR = Path(__file__).parent

private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"


auth_jwt_private_key: str = private_key_path.read_text()
auth_jwt_public_key: str = public_key_path.read_text()
auth_jwt_algorithm: str = "RS256"
auth_jwt_access_token_expire_minutes: int = 30  # 30 minutes
auth_jwt_refresh_token_expire_minutes: int = 60 * 24 * 30  # 30 days
# auth_jwt_refresh_token_expire_days: int = 60 * 24 * 30


AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")



###########################################################
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")          #  
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")  #
###########################################################


###################################################
SMTP_USER = os.getenv("SMTP_USER")  #
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  #
SMTP_HOST = os.getenv("SMTP_HOST")  #
SMTP_PORT = os.getenv("SMTP_PORT")  #
###################################################


STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
BASE_URL = os.getenv("BASE_URL") 
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY") 
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
