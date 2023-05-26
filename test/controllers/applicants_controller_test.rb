require "test_helper"

class ApplicantsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @applicant = applicants(:one)
    @nametest = "test"
  end

  test "should get index" do
    get api_v1_applicants_url, as: :json
    assert_response :success
  end

  test "should create applicant" do
    assert_difference("Applicant.count") do
      post api_v1_applicants_url, params: { applicant: { avatar: @applicant.avatar, name: @nametest, phone: @applicant.phone } }, as: :json
    end

    assert_response :created
  end

  test "should show applicant" do
    get api_v1_applicant_url(@applicant), as: :json
    assert_response :success
  end

  test "should update applicant" do
    patch api_v1_applicant_url(@applicant), params: { applicant: { avatar: @applicant.avatar, name: @nametest, phone: @applicant.phone} }, as: :json
    assert_response :success
  end

  test "should destroy applicant" do
    assert_difference("Applicant.count", -1) do
      delete api_v1_applicant_url(@applicant), as: :json
    end

    assert_response :success
  end
end
