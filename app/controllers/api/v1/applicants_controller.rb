class Api::V1::ApplicantsController < ApplicationController
  before_action :set_applicant, only: %i[ show update destroy ]

  #List all applicants!
  # GET /applicants
  def index
    applicants = Applicant.search_by_name(params[:search])
    render json: applicants.map{|a| a.formatted_applicant}
  end

  #show an existing applicant!
  # GET /applicants/1
  def show
    render json: @applicant.formatted_applicant
  end

  #create new applicants!
  # POST /applicants
  def create
    applicant = Applicant.new(applicant_params)

    if applicant.save
      render json: applicant.formatted_applicant, status: :created
    else
      render json: applicant.errors, status: :unprocessable_entity
    end
  end
  #update an existing applicant!
  # PATCH/PUT /applicants/1
  def update
    if @applicant.update(applicant_params)
      render json: @applicant.formatted_applicant
    else
      render json: @applicant.errors, status: :unprocessable_entity
    end
  end

  #Delete an existing applicant!
  # DELETE /applicants/1
  def destroy
    if @applicant.destroy
      render json: {status: "success", message: "Applicant deleted successfully"}
    else
      render json: {status: "error", message: "Applicant not deleted"}
    end
  end
  #search for applicants!
  # GET /applicants/search

  # show all applicants that do not have a specific role
  def search_without_x_role
    applicants = Applicant.search_without_x_role(params[:role_id])
    render json: applicants.map{|a| a.formatted_applicant}
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_applicant
      @applicant = Applicant.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def applicant_params
      params.require(:applicant).permit(:name, :phone, :email, :avatar)
    end

end
