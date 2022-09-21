class Track < ApplicationRecord
    has_one_attached :audio_data
end
