require 'test_helper'

class ApplicantsRolesControllerTest < ActionDispatch::IntegrationTest
    setup do
        @applicant = applicants(:one)
        @role = roles(:one)
    end
    
    test "should create applicant_role" do
        assert_difference('ApplicantsRole.count') do
            post api_v1_applicants_roles_url, params: { role_id: @role.id, applicant_id: @applicant.id }, as: :json
        end
    
        assert_response :created
    end
    
    test "should destroy applicant_role" do
        assert_difference('ApplicantsRole.count', -1) do
            delete api_v1_applicant_url(@applicant.id, @role.id ), as: :json
        end
    
        assert_response :success
    end

    test "should update applicant_role" do
        applicants_roles(:one)
        put u_api_v1_applicants_roles_url(@applicant.id, @role.id ), params: { status: "rejected" }, as: :json
        assert_response :success
    end

end