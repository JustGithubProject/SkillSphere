VIDEOS = "videos"
PHOTO = "photos"
IMAGES = "images"
COURSE = "course"


SUPPORTED_FILE_TYPES = {
    IMAGES: {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'application/pdf': 'pdf',
    },
    VIDEOS: {
        'video/mp4': 'mp4',
        'video/avi': 'avi',
        'video/mov': 'mov',
    }
}


KB = 1024
MB = 1024 * KB

# размеры файлов для каждого типа
DEFAULT_MAX_SIZE = 1 * MB  # 1 MB для большинства типов
VIDEO_MAX_SIZE = 100 * MB  # 20 MB для MP3


MAX_FILE_SIZES = {
    'mp4': VIDEO_MAX_SIZE,
    'avi': VIDEO_MAX_SIZE,
    'mov': VIDEO_MAX_SIZE,
    'jpg': DEFAULT_MAX_SIZE,
    'png': DEFAULT_MAX_SIZE,
    'pdf': DEFAULT_MAX_SIZE,
}