import enum


class CourseLevel(enum.Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"


class Category(enum.Enum):
    WEB_DESIGN = "web-design"
    DEVELOPMENT = "development"
    GAME_DESIGN = "game-design"
    APPS_DESIGN = "apps-design"
    MARKETING = "marketing"
    RESEARCH = "research"
    CONTENT_Writing = "content-writing"
    SEO = "seo"