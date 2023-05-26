class Api::V1::ApplicantsRolesController < ApplicationController
    before_action :set_applicant_role, only: %i[ update destroy ]


    #Change the applicant status on a given role
    # PATCH/PUT /applicants_roles/1
    def update
        if @applicant_role.update(applicant_role_params)
            render json: @applicant_role
        else
            render json: @applicant_role.errors, status: :unprocessable_entity
        end
    end

    #add a new applicant to a role
    # POST /applicants_roles
    def create
        @applicant_role = ApplicantsRole.new(applicant_role_params)

        if @applicant_role.save
            render json: @applicant_role, status: :created
        else
            render json: @applicant_role.errors, status: :unprocessable_entity
        end 
    end

    # DELETE /applicants_roles/1
    def destroy
        if @applicant_role.destroy
            render json: {status: "success", message: "Role removed from applicant successfully"}
        else
            render json: {status: "error", message: "Role not deleted"}
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_applicant_role
      @applicant_role = ApplicantsRole.find_by(applicant_id: params[:applicant_id], role_id: params[:role_id])

        if @applicant_role.nil?
            render json: {status: "error", message: "Role not found"}
            return
        end
    end

    # Only allow a list of trusted parameters through.
    def applicant_role_params
      params.require(:applicants_role).permit(:applicant_id, :role_id, :status)
    end
end
