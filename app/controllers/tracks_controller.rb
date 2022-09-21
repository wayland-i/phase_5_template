class TracksController < ApplicationController

    def index
        render json: Track.all
    end


    def create
        track = Track.create(track_params)
        render json: track, status: :created
    end


    private

    def track_params
        params.permit(:audio_data)
    end

end
