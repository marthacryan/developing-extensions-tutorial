import json
import random

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado


IMAGES = [
    'https://i.picsum.photos/id/645/600/400.jpg?hmac=o3VXrkQAMuhKdxIBPoyZyXh_3DxYWyFPTVzJwog5dvc',
    'https://i.picsum.photos/id/413/600/400.jpg?hmac=kRgTumHD_bxZ02j7BSTgmAFEiA4qT9kypayycAEVONw',
    'https://i.picsum.photos/id/599/600/400.jpg?hmac=j_w8Ce9kqdR9UVokuFE1CUcsVZ_1iU0gdsJ7XJrUtNg',
    'https://i.picsum.photos/id/811/600/400.jpg?hmac=m1Q7EKcIrXkJC_NqQGk-ofR0CIf1juBx2YJw9LuKL9c',
    'https://i.picsum.photos/id/352/600/400.jpg?hmac=yr5Yz0hu6DTKKt-ExqT5kbnQRlZdgXpeEE59uw_9BYI',
    'https://i.picsum.photos/id/152/600/400.jpg?hmac=JSE6ueTxsG8dYsvNUg2Ck-LXuzP8Hb1ZCI-1Q4etOdQ',
    'https://i.picsum.photos/id/265/600/400.jpg?hmac=y0WhQVoWojLpIVzU8luYqJGMQ-DLWjBk8Us8coEvkg4',
    'https://i.picsum.photos/id/381/600/400.jpg?hmac=mIXT8EBWd2xX6ITYfNnwVBNLQZehs7h4QFwTXzKEZX4',
    'https://i.picsum.photos/id/1074/600/400.jpg?hmac=-mqpWcJSXqmfo8UkPkASvV1o1NXtm6MpwreadzQAu_o',
    'https://i.picsum.photos/id/94/600/400.jpg?hmac=zCcpJ21ZqN44qRzNoLdlpu7TmAgS3li51ZjevQRi3gQ'
]


class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        image_url = random.choice(IMAGES)
        self.finish(json.dumps({
            "image_url": image_url
        }))


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "tutorial-extension", "image")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
