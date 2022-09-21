class Track < ApplicationRecord
    has_one_attached :audio_data


    # def audio_data
    #     rails_blob_path(self.audio_data, only_path: true) if self.audio_data.attached?
    # end
    
end
