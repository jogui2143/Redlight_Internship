class Api::V1::RolesController < ApplicationController
  before_action :set_role, only: %i[ show update destroy ]

  # GET /roles
  def index
    roles = Role.search_by_name(params[:search])
    render json: roles.map{|role| role.formatted_role}
  end

  # GET /roles/1
  def show
    render json: @role.formatted_role
  end

  # POST /roles
  def create
    role = Role.new(role_params)

    if role.save
      render json: role.formatted_role, status: :created
    else
      render json: role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /roles/1
  def update
    if @role.update(role_params)
      render json: @role.formatted_role
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /roles/1
  def destroy
    if @role.destroy
      render json: { message: 'Role was successfully deleted.' }
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_role
      @role = Role.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def role_params
      params.require(:role).permit(:name)
    end
end
