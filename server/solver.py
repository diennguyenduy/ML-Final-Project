from PIL import Image
from keras.preprocessing import image
import numpy as np
from numpy import *
from keras.models import load_model
import tensorflow as tf

graph = tf.compat.v1.get_default_graph


class Solver:
    def __init__(self):
        self.model = load_model("./emotion_model.h5")
        print("model loaded")

    def one_dim_arr_to_img(self, raw_arr, width, height):
        new_arr = []
        for i in range(0, len(raw_arr)):
            if (i+1) % 4 != 0:
                new_arr.append(raw_arr[i])
        img_mtx = np.array(new_arr, 'uint8').reshape((height, width, 3))

        img = Image.fromarray(img_mtx, 'RGB')
        # img.save('my.png')
        img = img.resize((48, 48), Image.ANTIALIAS)
        gray_img = img.convert('L')
        return image.img_to_array(gray_img)

    def predict(self, img_array):
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255
        print(img_array)
        print(img_array.shape)
        global graph
        with graph.as_default():
            res = self.model.predict(img_array)
        return res
